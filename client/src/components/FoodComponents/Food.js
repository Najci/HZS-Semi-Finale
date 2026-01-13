import {FoodInventoryItem, FoodListItem, FoodNormal, FoodSmall} from './FoodProp'
import React from 'react'
import axios from 'axios'

class FoodStatsClass{
    Calories 
    Protein
    Fat 
    Sugar
    Carbs

    constructor(calories, protiens, fats, sugar, carbs){
        this.Calories = calories || 0
        this.Protein = protiens || 0
        this.Fat = fats || 0
        this.Sugar = sugar || 0
        this.Carbs = carbs || 0
    }

    static returnStats(){
        return ["Calories", "Protein", "Fat", "Sugar", "Carbs"]
    }
}

class FoodClass extends FoodStatsClass{
    _id
    Name
    Img
    Count

    constructor(ID, name, img, calories, proteins, fats, sugar, carbs){
        super(calories, proteins, fats, sugar, carbs);

        this._id = ID
        this.Name = name
        this.Img = `/src/assets/foodIcons/${img}`
        this.Count = ""
    }

    buildIconWithAdd(selectFood, addCartCount){
        return React.createElement(FoodSmall,{Img: this.Img, Name: this.Name, key: this.Name, Count: this.Count, ClickAction: () => {
            if(selectFood === null || addCartCount === null) {return}
            selectFood(this)
            addCartCount(0)
        }})
    }

    buildIcon(){
        return React.createElement(FoodInventoryItem,{Img: this.Img, Name: this.Name, key: this.Name, Count: this.Count})
    }

    buildIconWithDrag(startDrag){
        if((parseInt(this.Count) || 0) == 0){console.log(this.Name, "is not loading"); return}
        return React.createElement(FoodNormal,{Img: this.Img, Name: this.Name, key: this.Name, Count: this.Count, ClickAction: (e) => startDrag(e, this)})
    }

    copyTableData() {
        const copy = new FoodClass(
            this._id,
            this.Name,
            this.Img.split("/").pop(),
            this.Calories,
            this.Protein,
            this.Fat,
            this.Sugar,
            this.Carbs
        );
    
        copy.Count = this.Count;
        return copy;
    }
}

const buildFoodClass = (item) => {
    const foodItem = new FoodClass(
        item._id,
        item.Name,
        item.Img,
        item.Cal,
        item.Pro,
        item.Fat,
        item.Sug,
        item.Carbs
    )

    return foodItem
}

export {FoodClass, buildFoodClass, FoodStatsClass} 