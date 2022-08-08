var pow = require('pow-mongodb-fixtures');
var fixtures = pow.connect('crmdb');
var id = pow.createObjectId;

fixtures.load({
    contacts:[
        {
            "_id" : id(),
            "firstName" : "andrew",
            "lastName" : "zocko",
            "email" : "zocko@gmail.com",
            "phone": "069765332509",
            "civilite": "Celibataire",
            "adresse": "Maarif",
            "code_postal": "2000",
            "date_naissance": "16/05/2022",
            "ville": "Casablanca"
        },
        {
            "_id" : id(),
            "firstName" : "andre",
            "lastName" : "maestro",
            "email" : "maestro@gmail.com",
            "phone": "079765332509",
            "civilite": "Celibataire",
            "adresse": "Maarif",
            "code_postal": "2000",
            "date_naissance": "26/05/2022",
            "ville": "Casablanca"
        }
    ]
});