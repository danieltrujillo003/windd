# WINDD API

User-based RESTful API for real estates management and lodging.

- **express** framework used for the server and endpoints.
- **cors** module used to globally enable CORS.
- **mongoose** used for the data storage.

## Setup

Since the API is meant to use a local mongo database, **mongodb** and **mongod** need to be installed in the machine.

Make sure there is a `/data/db/` folder with writing permissions in root.

Execute `mongod` in a new terminal and leave it running while the API is operating.

Init the API by executing `npm start` on a new terminal, It should log the port in which the API will be running.

All set, enjoy.

## Endpoints

### Estates

- Read **(GET)**: `/estates/get/all`
  - Filter by price: `sort=asc||desc`
- Read by email **(GET)**: `/estates/get/{email}`
- Read by Id **(GET)**: `/estates/get/{id}`
- Create **(POST)**: `/estates/add`
- Update **(PUT)**: `/estates/update/{id}`
- Delete **(DELETE)**: `/estates/delete/{id}`

### Users

- Register **(POST)**: `/users/register`
- Read **(GET)**: `/users/{email}`
- Login **(PUT)**: `/users/login`
- Change password **(PUT)**: `/users/change`
- Delete **(DELETE)**: `/users/delete`