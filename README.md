# SunshineWaiter

## Setting up environmental variables

In directory `/backend/`, copy `.env_file_template` to `.env_file`.
Keep your secret string in it.
You can generate a secret string by running this code in node.js:

```javascript
require('crypto').randomBytes(48, function(err, buffer) {
	var token = buffer.toString('hex');
	console.log(token);
});
```

like this:

![Pasted_Image_18_3_20__21_26](README.assets/Pasted_Image_18_3_20__21_26.png)

## How to Run with Docker

### Build, Setup and Configure

#### Run with Docker

##### First-time setup

1. Open a terminal and `git clone` this [repository](https://github.com/unsw-cse-comp3900-9900/capstone-project-sunshine-waiter)
    > Or unzip our web application if you have the zip file
2. If you install docker on Mac/Windows, then just go to [Docker's official website](https://www.docker.com/products/docker-desktop) and download and install docker, then start docker in your computer.
3. If you install docker on Debian Squeeze
    > - Please follow the instructions [here](https://docs.docker.com/engine/install/debian/)
    > - Note that make sure you have root priviledges to run commands.
    > - Note that we cannot get the root priviliedges in vlab, which means the `sudo` is not working, so we, sadly, cannot go through this step. So if there is an issue on installing docker in Debian system, you can try use mac/windows if possible. If not, please contact us for further help or other alternative ways at any time.
4. Up to this step, the docker daemon should be up and listening for connections. If not, the following steps would not run successfully.
5. Open a terminal and`cd` to the root directory of this project(same directory with `docker-compose.yml`)
    > By default, the `backend/.env_file` file will be cloned together from the repository, but just in case that if there is no such file in the backend folder, just create one and copy and paste the following content in it:
    >
    > ```javascript
    > SW_JWT_SECRET = asdfdasfajsldfjdsjfjkljsfdjaklsdfjkladsjfklasdjflkjkljdakfjaldsfjlerioqueoirudgncn;
    > MONGO_INITDB_ROOT_USERNAME = ROOT_USERNAME;
    > MONGO_INITDB_ROOT_PASSWORD = ROOT_PASSWORD;
    > ```
6. Run `docker-compose up --build` to build and run this project
7. After everything is built and up, go to `http://localhost:3000`

##### Subsequence runs

1. Run `docker-compose up` in your terminal (make sure the docker is up in your computer, otherwise the docker command will not working)
2. Go to `http://localhost:3000`

### Play around our system and functionalities

#### Before using our system

##### 1. Create Multiple profiles

Due to the persist-login functionality in our system, a chrome profile can only persist a user's cookie from SW website. So it is better to create multiple profiles in chrome and run our website to avoid the situation that logging in one more user will kick out the current user.

Reason to have this multiple profiles to play around our web application is that our web application has all kinds of interaction between different roles.

Way to create profile in Chrome, [click here](https://www.bettercloud.com/monitor/the-academy/how-to-create-switch-profiles-in-chrome/)

##### 2. Generate and Use our dummy data if you want

-   After the system is up, type the following code to initiate dummy data

```
curl http://localhost:8000/dbinit
```

-   This will generate hundreds of SW users and thousands of history order records which is enough for sales analysis in dashboard in the manager page
-   All users information can be found in `dummyUsers.json` for the sake of login

##### 3. Play around with your own create data

-   Please follow the video guide below to create your own mock-up data step by step

#### Video Guides

##### 1. [How to create a restaurant, build menu and invite staffs](https://youtu.be/eb3eQ_ZZ1xo)

##### 2. [How to make an order](https://www.youtube.com/watch?v=3I23qQJmjWQ)

##### 2.1 Make an order by scanning a QRcode

> This way is to use our dummy data, so make sure you have populated our dummy data, then this QRcode will be valid and you can make order in Crig's Old Town HongKong Cusine restaurant.
>
> To set this as an example, customer page can be accessed by scanning the QRcode which is generated by QR code Generator. Based on our configuration with docker, customer can enter into menu page by scanning QRcode with QR reader in the computer.

> The following is the Crig's Old Town HongKong Cusine restaurant's QRcode, which contains information of tableid=10.
> ![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_4269567160423a259c2b6dcd6d5b5e93.png)

##### 2.2 Make an order by entering a URL

> Another way is to type into URL directly. Steps are as follows.
>
> Step 1
> Enter into this page and click **customer** button.
> ![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_c0a2e09ded7c7dff53321ae18634fad5.png)

> Step 2
> Enter the menu page. The toast is showing that the tableid is null.
> ![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_ed18bebd7628a07da3fa7e104e4d6d7f.png)

> Step 3
> Type tableid in the URL and refresh. Until now, the tableid is set well and you are free to make an order.
> ![](https://codimd.s3.shivering-isles.com/demo/uploads/upload_18eadce48a1595e625a2d8ab9b4b30ae.png)

##### 3. [Sales analysis section](https://www.youtube.com/watch?v=BgWIriECzFo)
