import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlantService } from 'src/app/services/plant.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {
  // private data!: any[]; same as below
  private data: any[] | undefined;  /* Declare le type de ma propriété */
  public listCategories!: string[]; /* ! : type of prop could be undefined */
  private subListProduct: Subscription;
  public listProduct!: any[];
  public term!: "";

  constructor(private plantService: PlantService) {

    this.subListProduct = this.plantService.subjectListProduct$.subscribe(response => {
     console.log(response);
     this.data = response;
     this.listCategories = _.uniq(this.data.map (x => x.product_breadcrumb_label));
     console.log(this.listCategories);

     response.length = 40; // juste pour le dev dans notre contexte d'apprentissage
     this.listProduct = [...response]
   })

   this.plantService.getListProductsChaud();
   // declancher la req API et la resp est transmise avec un Subject
  }

  ngOnInit(): void {
  }
  // Methode de cycle de vie de mon composant qui est executee
  // juste avant l'instance de mon composant soit detruite

  ngOnDestroy(): void {
    this.subListProduct.unsubscribe();
  }

  addItem(term: any) {
    console.log(term);
    if (term.trim() != '') {
      this.listProduct = this.listProduct.filter((product) => {
          return (product.product_name.toLowerCase().indexOf(term.toLowerCase()) > -1)
      })
    } else {
      this.plantService.subjectListProduct$.subscribe(products => {
          console.log(products);
          this.listProduct = products;
      })
      this.plantService.getListProductsChaud();
    }
  }

}
