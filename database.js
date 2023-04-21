require('dotenv').config()
const Database = require('dbcmps369')
const geo = require('node-geocoder');
const geocoder = geo({ provider: 'openstreetmap' });

class PlacesDB{
    constructor(){
        this.db = new Database();
    }

    async initialize() {
        await this.db.connect()

       await this.db.schema('Places', [
            {name: 'id', type: 'INTEGER'},
            {name: 'label', type: 'TEXT'},
            {name: 'address', type: 'TEXT'},

        ], 'id');

        await this.db.schema('Coordinates', [
            {name: 'id', type: 'INTEGER'},
            {name: 'lat', type: 'DECIMAL'},
            {name: 'lng', type: 'DECIMAL'}
        ],'id');
        
    }

    async findPlaces(){
        const places = await this.db.read('Places', []);
        return places;
    }

    async findCoordinates(){
        const coordinate = await this.db.read('Coordinates', []);
        return coordinate;
    }

    async createPlaces(label, address){
        const id = await this.db.create('Places', [
            {column: 'label', value: label},
            {column: 'address', value: address}
        ]);
        return id;
    }

    async createCoordinates(lat, lng){
        const id = await this.db.create('Coordinates', [
            {column: 'lat', value: lat},
            {column: 'lng', value: lng}
        ]);
        return id;
    }

    

    async deletePlaces(id){
        await this.db.delete('Places', [{column: 'id', value: id}])
    }

    async deleteCoordinates(id){
        await this.db.delete('Coordinates', [{column: 'id', value: id}])
    }

}

module.exports = PlacesDB;