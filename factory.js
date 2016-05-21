require('./db.js');

module.exports.createObjectWithName = function(coleccion, v1, v2, v3, v4, v5) {
	var obj = null;
	
	if ( coleccion == 'User') {
		obj = new User({username:v1, password:v2, type:v3});
	}
	else if ( coleccion == 'Registro') {
		obj = new Registro({IdUsuario:v1,TipoLog:v2, Fecha:v3});
	}
	else if ( coleccion == 'Enrollment') {
		obj = new Enrollment({idSubject:v1,idUser:v2});
	}
	else if ( coleccion == 'Score') {
		obj = new Score({idEnrollment:v1,idUser:v2, section:v3, score:v4});
	}
	else if ( coleccion == 'Subject') {
		obj = new Subject({name:v1,teacher:v2, group:v3, day:v4, hour:v5});
	}	
	return obj;
}

module.exports.findCollectionByName = function(name)
{
	var objeto = null;
	
	if(name === 'User') {
		objeto = User;
	}
	else if ( name === 'Registro') {
		objeto = Registro;
	}
	else if ( name === 'Enrollment') {
		objeto = Enrollment;
	}
	else if ( name === 'Score') {
		objeto = Score;
	}
	else if ( name === 'Subject') {
		objeto = Subject;
	}
	return objeto;
}

module.exports.updateData = function(name, key, data, service)
{
	if(name === 'User'){
		User.update({_id: key}, data, {upsert: true}, respuesta);
	}
	else if(name === 'Registro'){
		Registro.update({_id: key}, data, {upsert: true}, respuesta);
	}
	else if(name === 'Enrollment'){
		Enrollment.update({_id: key}, data, {upsert: true}, respuesta);
	}
	else if(name === 'Score'){
		Score.update({_id: key}, data, {upsert: true}, respuesta);
	}
	else if(name === 'Subject'){
		Subject.update({_id: key}, data, {upsert: true}, respuesta);
	}
		
	function respuesta (err)
	{
		if ( err)
		{
			return service.json({status:"fail", name:name, description:"ID_OBJECT_DONT_EXIST", value:[{}]});
		}
		else
		{
			return service.json({ status: "ok", name:name, description:"COLLECTION_QUERY_OK", value: key});
		}
	}
}