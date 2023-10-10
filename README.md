# FINAL PROJECT FOR JOHN BRICE, AN E-SHOP

- 1 download the project fron github from that link -= https://github.com/3raulo9/jb-project-final/archive/refs/heads/main.zip

- 2 open two terminal windows
- 3 now we're creating the front end
(
\jb-project-final-main>cd buytbackend 

\jb-project-final-main\buytbackend>cd buyt-front-end

\jb-project-final-main\buytbackend\buyt-front-end>npm install
)
- if it's not gonna install and will give a bunch of errors do the following instead
  
\jb-project-final-main\buytbackend\buyt-front-end>npm install --force


- 4 do the following after:
  
\jb-project-final-main\buytbackend\buyt-front-end>npm start

it will redirect you to a new page and will show you the following error - "Request failed with status code 500"
it's because we haven't connected our backend yet

- 5 connecting our backend but firstly we're creating our virtual environment so we don't install our packages on our machine:
\jb-project-final-main>cd buytbackend
\jb-project-final-main\buytbackend>virtualenv env
\jb-project-final-main\buytbackend>cd env
\jb-project-final-main\buytbackend\env>cd Scripts
\jb-project-final-main\buytbackend\env\Scripts>activate

if you done everthing alright you should see in the beginning of you line something like (env) C:\Users\
- 6 now actually downloading our requirements and activating our server
  
\jb-project-final-main\buytbackend\env\Scripts>cd..
\jb-project-final-main\buytbackend>pip install -r requirements.txt
\jb-project-final-main\buytbackend>python manage.py runserver

if you have done everything fine now you can play with the server by creating a user inside of the website or creating a super user using the terminal
that you used for the backend by doing the following: 

\jb-project-final-main\buytbackend>python manage.py createsuperuser

it will prompt you to enter some details that you would like to use on your website
and then do \jb-project-final-main\buytbackend>python manage.py runserver
again and check if everything works as intended

