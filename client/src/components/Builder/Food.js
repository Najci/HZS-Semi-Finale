import Food from './FoodProp'
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
    Component
    Count

    constructor(ID, name, img, calories, protiens, fats, sugar, carbs){
        this._id = ID
        this.Name = name
        this.Img = `/foodIcons/${img}`
        this.Calories = calories
        this.Protein = protiens
        this.Fats = fats
        this.Sugar = sugar
        this.Carbs = carbs
        this.Count = ""
    }

    buildIconWithAdd(selectFood, addCartCount){
        return React.createElement(Food,{Img: this.Img, Name: this.Name, key: this.Name, Count: this.Count, ClickAction: () => {
            if(selectFood === null || addCartCount === null) {return}
            selectFood(this)
            addCartCount(0)
        }})
    }

    buildIconWithDrag(){
        return React.createElement(Food,{Img: this.Img, Name: this.Name, key: this.Name, ClickAction: () => {
            console.log(this.Name)
        }})
    }

}

const Foods = new Map()

await axios.get(`http://localhost:3000/api/getstore`)
.then((res) => {

    res.data.forEach(item => {
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

        Foods.set(item.Name, foodItem)
    })
})
.catch((error) => {
    console.log(error)
})

export {Foods, FoodClass}