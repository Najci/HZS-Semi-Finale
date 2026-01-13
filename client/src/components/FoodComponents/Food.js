import {FoodNormal, FoodSmall} from './FoodProp'
import React from 'react'
import axios from 'axios'

class FoodClass{
    _id
    Name
    Img
    Calories
    Protein
    Fats
    Sugar
    Carbs
    Count

    constructor(ID, name, img, calories, protiens, fats, sugar, carbs){
        this._id = ID
        this.Name = name
        this.Img = `/src/assets/foodIcons/${img}`
        this.Calories = calories
        this.Protein = protiens
        this.Fats = fats
        this.Sugar = sugar
        this.Carbs = carbs
        this.Count = ""
    }

    buildIconWithAdd(selectFood, addCartCount){
        return React.createElement(FoodSmall,{Img: this.Img, Name: this.Name, key: this.Name, Count: this.Count, ClickAction: () => {
            if(selectFood === null || addCartCount === null) {return}
            selectFood(this)
            addCartCount(0)
        }})
    }

    buildIconWithDrag(startDrag){
        return React.createElement(FoodNormal,{Img: this.Img, Name: this.Name, key: this.Name, Count: this.Count, ClickAction: (e) => startDrag(e, this)})
    }

    copyTableData(){
        return { ...this }
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

export {FoodClass, buildFoodClass} 