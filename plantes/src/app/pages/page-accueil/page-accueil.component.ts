import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlantService } from 'src/app/services/plant.service';
import * as _ from 'underscore';
import { Options , LabelType } from "@angular-slider/ngx-slider";

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

  min: number = 30;
  max: number = 120;
  options: Options = {
    floor: 0,
    ceil: 150,
    translate: (value: number, label: LabelType): string => {  
        switch (label) {  
            case LabelType.Low:  
                return "<b>Min price:</b> $" + value;  
            case LabelType.High:  
                return "<b>Max price:</b> $" + value;  
            default:  
                return "$" + value;  
        }  
    }
  }


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
    this.plantService.subjectListProduct$.subscribe(products => {
      if (term.trim() != '') {
      this.listProduct = products.filter((product) => {
          return (product.product_name.toLowerCase().indexOf(term.toLowerCase()) > -1)
      })
    } else {
      this.listProduct = products;
    }
  })
    this.plantService.getListProductsChaud();
  }

  displayItem($event: any) {

      this.plantService.subjectListProduct$.subscribe(listProduct => {
        this.listProduct = listProduct.filter(product => {
          return product.product_unitprice_ati >= $event.value && product.product_unitprice_ati <= $event.highValue
        });
      console.log("yoo")
      console.log(listProduct)
      })    
      this.plantService.getListProductsChaud();
  };

}
  