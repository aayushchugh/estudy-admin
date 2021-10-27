> **WARNING**: auth query in every type of request is required else your request will not be fulfilled

### Authentication

#### Signup user

```http
  POST /v1/signup
```

Request

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Body       | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `Name`     | `string` | **Required**. Name of user     |
| `Email`    | `string` | **Required**. Email of user    |
| `Password` | `string` | **Required**. Password of user |

Errors

| Status | Message                                | Reason                                                                         |
| :----- | :------------------------------------- | :----------------------------------------------------------------------------- |
| `400`  | name, email, password all are required | some thing from name, email, password is missing in body while sending request |
| `400`  | Duplicate email                        | Email already exist in database                                                |

Success

| Status | Message                       | Data     |
| :----- | :---------------------------- | :------- |
| `201`  | successfully created new user | new user |

#### Login user

```http
  POST /v1/login
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Body       | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `Email`    | `string` | **Required**. Email of user    |
| `Password` | `string` | **Required**. Password of user |

Errors

| Status | Message                         | Reason                                                                   |
| :----- | :------------------------------ | :----------------------------------------------------------------------- |
| `400`  | email and password are required | some thing from email, password is missing in body while sending request |
| `400`  | Wrong Password                  | Wrong Password                                                           |

Success

| Status | Message                | Data            |
| :----- | :--------------------- | :-------------- |
| `200`  | logged in successfully | user, jwt-token |

---

### Users

#### All users

```http
  GET /v1/users/all-users
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

Success

| Status | Message | Data  |
| :----- | :------ | :---- |
| `200`  | none    | users |

#### Update user

```http
  PATCH /v1/users/update/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. id of user to update |

| Body             | Type     | Description                                                               |
| :--------------- | :------- | :------------------------------------------------------------------------ |
| `name`           | `string` | **Optional**. name of user                                                |
| `class`          | `string` | **Optional**. class of user                                               |
| `userPassword`   | `string` | **Optional**. current password of user                                    |
| `updatePassword` | `string` | **Optional**. password to be changed in place of current password of user |

Errors

| Status | Message                                                    | Reason                                                                                                 |
| :----- | :--------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `400`  | name, userClass, userPassword, updatePassword are required | some thing from name, userClass, userPassword, updatePassword is missing in body while sending request |
| `400`  | User not found                                             | user with id is not found in database check your id                                                    |
| `400`  | Invalid Password                                           | invalid Password check that                                                                            |
| `400`  | Invalid class                                              | class can only be 9, 10, 11                                                                            |
| `400`  | Invalid id                                                 | id that your are passing in query is invalid                                                           |

Success

| Status | Message                   | Data         |
| :----- | :------------------------ | :----------- |
| `200`  | user updated successfully | updated user |

#### Delete user

```http
  DELETE /v1/users/delete-user/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. id of user to delete |

Errors

| Status | Message    | Reason                                       |
| :----- | :--------- | :------------------------------------------- |
| `400`  | Invalid id | id that your are passing in query is invalid |

Success

| Status | Message                   | Data         |
| :----- | :------------------------ | :----------- |
| `200`  | user deleted successfully | deleted user |

---

### Update Email List

#### Add new user

```http
  POST /v1/updateEmailList/add
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Body    | Type     | Description                 |
| :------ | :------- | :-------------------------- |
| `Name`  | `string` | **Required**. Name of user  |
| `Email` | `string` | **Required**. Email of user |
| `Class` | `string` | **Required**. Class of user |

#### Unsubscribe user

```http
  POST /v1/updateEmailList/unsubscribe
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Body    | Type     | Description                 |
| :------ | :------- | :-------------------------- |
| `Email` | `string` | **Required**. Email of user |

#### All Emails

```http
  GET /v1/updateEmailList/get-all
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

---

### Contact Us

#### new Contact

```http
  POST /v1/contact-us/new
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Body      | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `Name`    | `string` | **Required**. Name of Sender     |
| `Email`   | `string` | **Required**. Email of Sender    |
| `Subject` | `string` | **Required**. Subject of message |
| `Message` | `string` | **Required**. Description        |

#### All contacts

```http
  GET /v1/contact-us/get-all
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

#### Single contact

```http
  GET /v1/contact-us/get-single/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. id of contact |

#### update status

```http
  PATCH /v1/contact-us/update/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `id`      | `string` | **Required**. id of contact to be updated |

| Body     | Type     | Description                        |
| :------- | :------- | :--------------------------------- |
| `status` | `string` | **Required**. status to be updated |

#### Delete contact

```http
  DELETE /v1/contact-us/delete/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `id`      | `string` | **Required**. id of contact to be deleted |

---

### Testimonials

#### Add

```http
  POST /v1/testimonial/add
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Body      | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `name`    | `string` | **Required**. name to be shown |
| `content` | `string` | **Required**. description      |
| `rating`  | `string` | **Required**. rating           |

#### All

```http
  GET /v1/testimonial/get-all
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

#### Single

```http
  GET /v1/testimonial/get-single/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Required**. id of testimonial |

#### update

```http
  PATCH /v1/testimonial/update/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Required**. id of testimonial |

| Body      | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `name`    | `string` | **Optional**. name to be shown |
| `content` | `string` | **Optional**. description      |
| `rating`  | `string` | **Optional**. rating           |

#### delete

```http
  DELETE /v1/testimonial/delete/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `id`      | `string` | **Required**. id of testimonial to delete |

---

### Class

#### Add new class

```http
  POST /v1/class/add
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Body          | Type     | Description                        |
| :------------ | :------- | :--------------------------------- |
| `title`       | `string` | **Required**. title of class       |
| `description` | `string` | **Required**. description of class |

#### All

```http
  GET /v1/class/get-all
```

| Query     | Type     | Description                                                     |
| :-------- | :------- | :-------------------------------------------------------------- |
| `auth`    | `string` | **Required**. Your Authentication key                           |
| `subject` | `string` | **Optional**. add if you want to populate subjects inside class |

#### Single

```http
  GET /v1/class/get-single/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                                                         |
| :-------- | :------- | :------------------------------------------------------------------ |
| `id`      | `string` | **Required**. id of class                                           |
| `subject` | `True`   | **Required**. add this if you want to populate subject inside class |

#### update

```http
  PATCH /v1/class/update/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. id of class |

| Body          | Type     | Description                  |
| :------------ | :------- | :--------------------------- |
| `title`       | `string` | **Optional**. title of class |
| `description` | `string` | **Optional**. description    |

#### delete

```http
  DELETE /v1/class/delete/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. id of class to delete |

---

### Subject

#### Add

```http
  POST /v1/subject/add
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Body    | Type     | Description                                         |
| :------ | :------- | :-------------------------------------------------- |
| `title` | `string` | **Required**. title of subject                      |
| `class` | `string` | **Required**. class in which subject is to be saved |

#### All

```http
  GET /v1/subject/get-all
```

| Query   | Type     | Description                                                            |
| :------ | :------- | :--------------------------------------------------------------------- |
| `auth`  | `string` | **Required**. Your Authentication key                                  |
| `class` | `string` | **Optional**. add if you want to get subjects of only particular class |
| `all`   | `string` | **Optional**. add if you want to get all subjects                      |

#### Single

```http
  GET /v1/subject/get-single/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. id of subject |

#### update

```http
  PATCH /v1/subject/update/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. id of subject |

| Body    | Type     | Description                    |
| :------ | :------- | :----------------------------- |
| `title` | `string` | **Optional**. title of subject |

#### delete

```http
  DELETE /v1/subject/delete/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `string` | **Required**. id of subject to delete |

---

### Notes

#### Add

```http
  POST /v1/notes/add
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Body      | Type     | Description                                        |
| :-------- | :------- | :------------------------------------------------- |
| `title`   | `string` | **Required**. title of note                        |
| `link`    | `string` | **Required**. link of notes eg - google drive      |
| `subject` | `string` | **Required**. subject in which note is to be saved |
| `class`   | `string` | **Required**. class in which note is to be saved   |

#### All

```http
  GET /v1/notes/get-all
```

| Query     | Type     | Description                                                      |
| :-------- | :------- | :--------------------------------------------------------------- |
| `auth`    | `string` | **Required**. Your Authentication key                            |
| `class`   | `string` | **Optional**. add if you want to get notes of particular class   |
| `subject` | `string` | **Optional**. add if you want to get notes of particular subject |
| `all`     | `string` | **Optional**. add if you want to get all notes                   |

#### Single

```http
  GET /v1/notes/get-single/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `string` | **Required**. id of note |

#### update

```http
  PATCH /v1/notes/update/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `string` | **Required**. id of note |

| Body    | Type     | Description                 |
| :------ | :------- | :-------------------------- |
| `title` | `string` | **Optional**. title of note |
| `link`  | `string` | **Optional**. link of note  |

#### delete

```http
  DELETE /v1/notes/delete/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. id of note to delete |

---

### Pyqs

#### Add

```http
  POST /v1/pyq/add
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Body      | Type     | Description                                       |
| :-------- | :------- | :------------------------------------------------ |
| `title`   | `string` | **Required**. title of pyq                        |
| `link`    | `string` | **Required**. link of pyq eg - google drive       |
| `subject` | `string` | **Required**. subject in which pyq is to be saved |
| `class`   | `string` | **Required**. class in which pyq is to be saved   |

#### All

```http
  GET /v1/pyq/get-all
```

| Query     | Type     | Description                                                    |
| :-------- | :------- | :------------------------------------------------------------- |
| `auth`    | `string` | **Required**. Your Authentication key                          |
| `class`   | `string` | **Optional**. add if you want to get pyq of particular class   |
| `subject` | `string` | **Optional**. add if you want to get pyq of particular subject |
| `all`     | `string` | **Optional**. add if you want to get all pyq                   |

#### Single

```http
  GET /v1/pyq/get-single/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `string` | **Required**. id of pyq |

#### update

```http
  PATCH /v1/pyq/update/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `string` | **Required**. id of pyq |

| Body    | Type     | Description                |
| :------ | :------- | :------------------------- |
| `title` | `string` | **Optional**. title of pyq |
| `link`  | `string` | **Optional**. link of pyq  |

#### delete

```http
  DELETE /v1/pyq/delete/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of pyq to delete |

---

### Ncert Solutions

#### Add

```http
  POST /v1/ncert-solution/add
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Body      | Type     | Description                                                  |
| :-------- | :------- | :----------------------------------------------------------- |
| `title`   | `string` | **Required**. title of ncert solution                        |
| `link`    | `string` | **Required**. link of ncert solution eg - google drive       |
| `subject` | `string` | **Required**. subject in which ncert solution is to be saved |
| `class`   | `string` | **Required**. class in which ncert solution is to be saved   |

#### All

```http
  GET /v1/ncert-solution/get-all
```

| Query     | Type     | Description                                                               |
| :-------- | :------- | :------------------------------------------------------------------------ |
| `auth`    | `string` | **Required**. Your Authentication key                                     |
| `class`   | `string` | **Optional**. add if you want to get ncert solution of particular class   |
| `subject` | `string` | **Optional**. add if you want to get ncert solution of particular subject |
| `all`     | `string` | **Optional**. add if you want to get all ncert solution                   |

#### Single

```http
  GET /v1/ncert-solution/get-single/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. id of ncert solution |

#### update

```http
  PATCH /v1/ncert-solution/update/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. id of ncert solution |

| Body    | Type     | Description                           |
| :------ | :------- | :------------------------------------ |
| `title` | `string` | **Optional**. title of ncert solution |
| `link`  | `string` | **Optional**. link of ncert solution  |

#### delete

```http
  DELETE /v1/ncert-solution/delete/${id}
```

| Query  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `auth` | `string` | **Required**. Your Authentication key |

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | **Required**. id of ncert solution to delete |

---
