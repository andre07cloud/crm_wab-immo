

const User = require('./src/models/users');
const Appel = require('./src/models/appels');
const Contact = require('./src/models/contacts');
const Planification = require('./src/models/planifications');
const Archiv = require('./src/models/archives');

//INSERT DEFAUTL DOCUMENTS IN TO DATABASE



exports.createContactInit =function () {

	var data=[
		{
			"firstName":"Djakate",
			"lastName":"Gana",
			"email":"djakate@gmail.com",
			"phone":"0695092345",
			"civilite":"celibataire",
			"date_naissance":"2000-12-05"
		},
		{
			"firstName":"Bounah",
			"lastName":"Saar",
			"email":"bounah@gmail.com",
			"phone":"0615292643",
			"civilite":"celibataire",
			"date_naissance":"1984-12-03"
		},
		{
			"firstName":"Idrissa",
			"lastName":"Alcantara",
			"email":"idrissa@gmail.com",
			"phone":"0765242641",
			"civilite":"Marie",
			"date_naissance":"1991-02-08"
		}

	];

	Contact.countDocuments({}, function (err, count) {
		if (err){
			console.log(err)
		}else{
			console.log("Count :", count)
			if(count<3){
				for (var element of data) {
					if(count<3){
						var contact = new Contact(element);	

					// Then save the user
					contact.save(function(err) {
						if (err) {
							console.log(err);
						} else {
							console.log('1 Contact inserted');
						}
					});
					}
				
				  }
			}
			else{
				console.log('more than 3 Contacts already exits');
			}
		}
	});

};

  exports.createUserInit =function () {

	var data=[
		{
			"firstName":"JOSEPH",
			"lastName":"LAGLOIRE",
			"email":"joseph@gmail.com",
			"username":"joseph",
			"password":"allmyghtyGod@01",
		},
		{
			"firstName":"BERTRAND",
			"lastName":"LEROIS",
			"email":"bertrand@gmail.com",
			"username":"bertrand",
			"password":"allmyghtyGod@02",
		},
		{
			"firstName":"ESTEBANE",
			"lastName":"KAMBIASSO",
			"email":"estebane@gmail.com",
			"username":"estebane",
			"password":"allmyghtyGod@03",
		}

	];

	User.countDocuments({}, function (err, count) {
		if (err){
			console.log(err)
		}else{
			console.log("Count :", count)
			if(count<3){
				for (var element of data) {
					if(count<3){
						var user = new User(element);	

					// Then save the user
					user.save(function(err) {
						if (err) {
							console.log(err);
						} else {
							console.log('1 User inserted');
						}
					});
					}
				
				  }
			}
			else{
				console.log('more than 3 Users already exits');
			}
		}
	});

};

exports.createAppelInit =function () {

		var data=[
			{
				"duree_appel":"10:05:00"
			},
			{
				"duree_appel":"15:00:00"
			},
			{
				"duree_appel":"05:01:00"
			}

		];
		Appel.countDocuments({}, function (err, count) {
			if (err){
				console.log(err)
			}else{
				console.log("Count :", count)
				if(count<3){
					for (var element of data) {
						
					var appel = new Appel(element);	
	
						// Then save the user
						appel.save(function(err) {
							if (err) {
								console.log(err);
							} else {
								console.log('1 Appels inserted');
							}
						});
					  }
				}
				else{
					console.log('more than 3 Appels already exits');
				}
			}
		});

	};
	
	exports.createPlanificationInit =function () {

		var data=[
			{
				"object_plan":"Rendez-vous de contrat avec le prospect 1",
				"lien_rdv":"http://yahoo.com",
				"date_rdv":"2022-07-05"
			},
			{
				"object_plan":"Rendez-vous de contrat avec le prospect 2",
				"lien_rdv":"http://googe.com",
				"date_rdv":"2022-06-05"
			},
			{
				"object_plan":"Rendez-vous de contrat avec le prospect 3",
				"lien_rdv":"http://gmail.com",
				"date_rdv":"2022-06-25"
			}

		];
		Planification.countDocuments({}, function (err, count) {
			if (err){
				console.log(err)
			}else{
				console.log("Count :", count)
				if(count<3){
					for (var element of data) {
						
					var planification = new Planification(element);	
	
						// Then save the user
						planification.save(function(err) {
							if (err) {
								console.log(err);
							} else {
								console.log('1 Planification inserted');
							}
						});
					  }
				}
				else{
					console.log('more than 3 Planifications already exits');
				}
			}
		});

	};

	exports.createArchivInit =function () {

		var data=[
			{
				"fichier":"favicon.png"
			},
			{
				"fichier":"favicon.jpeg"
			},
			{
				"fichier":"Audio.mp3"
			}

		];
		Archiv.countDocuments({}, function (err, count) {
			if (err){
				console.log(err)
			}else{
				console.log("Count :", count)
				if(count<3){
					for (var element of data) {
						
					var archiv = new Archiv(element);	
	
						// Then save the user
						archiv.save(function(err) {
							if (err) {
								console.log(err);
							} else {
								console.log('1 Archive inserted');
							}
						});
					  }
				}
				else{
					console.log('more than 3 Archives already exits');
				}
			}
		});

	}

     