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

- Read **(GET)**: `/estates/getall`
- Read single **(GET)**: `/estates/getsingle/{id}`
- Create **(POST)**: `/estates/appointment/add`
- Update **(PUT)**: `/estates/appointment/update/{id}`
- Delete **(DELETE)**: `/estates/appointment/delete/{id}`

### Users

- Read single **(GET)**: `/users/getsingle/{id}`
- Create **(POST)**: `/users/appointment/add`
- Update **(PUT)**: `/users/appointment/update/{id}`
- Delete **(DELETE)**: `/users/appointment/delete/{id}`