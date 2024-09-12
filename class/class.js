//Family class
class Father {
    constructor(name, height, width, blood, character) {
        this.name = name
        this.height = height
        this.width = width
        this.blood = blood
        this.character = character
    }

    discription() {
        console.log(`This is my father, his name is ${this.name}, he is ${this.height} fit tall, he is ${this.width}, his blood group is ${this.blood}, he is of ${this.character} character `)
    }
}

class Mother extends Father {
    #works

    constructor(name, height, width, character, blood, hair, works) {
        super(name, height, width, character, blood)
        this.hair = hair
        this.#works = works
    }
        getWorks() {
            return this.#works;
        }    
        discription() {
            let work = '';
            if (this.#works) {
                work = console.log(`This is my mother, her name is ${this.name}, she is ${this.height} fit tall, she is ${this.width}, her blood group is ${this.blood}, she is of ${this.character} character, and she has a ${this.hair} hair ${this.getWorks()}`)
            } else {
                work = console.log(`This is my mother, her name is ${this.name}, she is ${this.height} fit tall, she is ${this.width}, her blood group is ${this.blood}, she is of ${this.character} character, and she has a ${this.hair} hair`)
            }
            return work;
        }

}

class Child extends Mother {
    #gender
    constructor(name, height, width, character, blood, hair, family, gender, age) {
        super(name, height, width, blood, character, hair)
        this.family = family
        this.#gender = gender
        this.age = age
    }

    discription() {
        if(this.#gender === 'Male') {
            console.log(`This is ${this.name} from the ${this.family} family, he is a ${this.#gender} child, he is ${this.height} fit tall and he is as ${this.width} like his father. He has a ${this.hair} hair like his mother, he is ${this.age} years old`)
        } else {
            console.log(`This is ${this.name} from the ${this.family} family, she is a ${this.#gender} child she is ${this.height} fit tall and she is as ${this.width} like her father. She has a ${this.hair} hair like her mother, she is ${this.age} years old`)
        }
    }
}

const father = new Father('Mr James', 6, 'fat', 'AA', 'good' )

father.discription()

const mother = new Mother('Mrs James', 5, 'not fat', 'AS', 'good', 'long and beautiful', 'she is a teacher')

mother.discription()

const child = new Child('Jessica James', 7, 'fat', 'AS', 'good', 'long and beautiful', 'James', 'female', 8)

child.discription()

const child1 = new Child('Joe James', 8, 'fat', 'AA', 'good', 'long and beautiful', 'James', 'Male', 10)

child1.discription()