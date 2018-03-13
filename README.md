"# Laravel_VueJs_CRUD_Demo" 


Server (demo_crud_api_server) => Laravel 5.6
============================================

1 - Create new database
{
	DB_DATABASE=demo_crud_api
	DB_USERNAME=root
	DB_PASSWORD=
}

2 - $ cd demo_crud_api_server

3 - $ php artisan migrate

4 - $ php artisan serve

5 - Check server runing on localhost:8000


##############################################


Consumer (demo_crud_api_consumer) => VueJs 2.x
==============================================

1 - Open new terminal

2 - $ cd demo_crud_api_consumer

3 - npm install

4 - npm run dev

5 - Go to http://localhost:8080/