import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-admincategory',
  templateUrl: './admincategory.component.html',
  styleUrls: ['./admincategory.component.css']
})
export class AdmincategoryComponent implements OnInit {

  error: string = "";
  INITIAL_CATEGORY: Category = { id: 0, c_name: "" };

  emitterValue = false;

  categories: Category[] = [];
  categoryModel: Category = this.INITIAL_CATEGORY;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;

      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }

  onSubmit(_t20: NgForm) {

    if (this.categoryModel.id === 0) {
      this.categoryService
        .postCategory({ c_name: this.categoryModel.c_name })
        .subscribe({
          next: (response: any) => {
            this.categories = response.data;
            this.categoryModel = this.INITIAL_CATEGORY;
          },
          error: (err) => {
            let message: string = err?.error?.error?.message;
            this.error = message.includes(",")
              ? message.split(",")[0]
              : message;
          },
        });
    } else {
      this.categoryService.putCategory(this.categoryModel).subscribe({
        next: (response: any) => {
          this.categories = response.data;
          this.categoryModel = this.INITIAL_CATEGORY;
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(",")
              ? message.split(",")[0]
              : message;
        },
      });
    }

  }

  deletecategory(id: number | undefined) {
    if (id !== undefined) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (response: any) => {
          this.categories = response.data;
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(",")
              ? message.split(",")[0]
              : message;
        },
      });
    }
  }
  editcategory(category: Category) {
    this.categoryModel = category;
  }

}
