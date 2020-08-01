// begin nav slide ---------------------------------------------------------------------------------------
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            }
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .5}s`;
            }
        });
        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlide();

// end nav slide ---------------------------------------------------------------------------------------

// variables
let course = [];

let courseCount = 0;
let sessionCount = [];

let formSessionCount = 0;


// query selectors
const addCourseBtn = document.querySelector('.add-course-button');
const addPeriodBtn = document.querySelector('.add-period-button');

const closeCoursePageBtn = document.querySelector('.close-add-course-page');
const addCoursePage = document.querySelector('.add-course-page');

// const submitCourse = document.querySelector('.submit-course-btn');

const submitForm = document.querySelector(".submit-course-btn");

const addSession = document.querySelector(".form-control-add-period");
const courseName = document.querySelector('.form-control-name-input');
const formPeriodList = document.querySelector('.form-period-list');


// query selectors - schedule modifier section\
const courseList = document.querySelector('.course-list');

// event listeners
closeCoursePageBtn.addEventListener("click", closeCoursePage);
addCourseBtn.addEventListener("click", openCoursePage);
submitForm.addEventListener("click", addCourse);
addSession.addEventListener("click", addPeriod);

// add course
function addCourse(e){
    e.preventDefault();
    
    let session = [];

    let name = courseName.value;
    


    for (let j = 0; j <= formSessionCount; j++) {
        let object = {};
        let day = [];
        let startTime = [];
        let endTime = [];
        for (let i = 1; i <= 7; i++){
            day[i] = document.querySelector('.day' + j + i).checked;
            startTime[i] = document.querySelector('.s' + j + i).value;
            endTime[i] = document.querySelector('.e' + j + i).value;
        }
        object[0] = day;
        object[1] = startTime;
        object[2] = endTime;
        session.push(object);

        if(sessionCount[courseCount] !== undefined){
            sessionCount[courseCount]++;
        } else {
            sessionCount[courseCount] = 0;
        }
    }
    
    let object = {};

    object[0] = sessionCount[courseCount];
    object[1] = name;
    object[2] = session;
    course.push(object);
    courseCount++;

    courseList.innerHTML += 
    `
    <div class="course-container">
        <div class="course-name-btn">
            <div class="course-name">${name}</div>                
            <button class="add-period-button">Add a period</button>
        </div>
        <div class="course-option-list">
            ${printPeriod()}
        </div>
    </div> 
    ` 
    function printPeriod(){
        let content = "";  
        for(let x = 0; x <= formSessionCount; x++){
            content += `<li class="list-item">${getDay(x) } </li>`;
        }          
        return content;
    }
    function getDay(x) {
        let days ="";
        for (let y = 1; y <= 7; y++){
            if (session[x][0][y] === true){
                if(y === 1)
                    days += "<h3>Mon </h3>";
                if(y === 2)
                    days += "<h3>Tues </h3>";
                if(y === 3)
                    days += "<h3>Wed </h3>";
                if(y === 4)
                    days += "<h3>Thur </h3>";
                if(y === 5)
                    days += "<h3>Fir </h3>";
                if(y === 6)
                    days += "<h3>Sat </h3>";
                if(y === 7)
                    days += "<h3>Sun </h3>";
                days += `StartTime: ${session[x][1][y]} EndTime: ${session[x][2][y]} <br>`
            }
        }
        return days;
    }



    //reset
    formSessionCount = 0;
    courseName.value = '';
    // for (let h = 0; h <= formSessionCount; h++) {
    //     for (let i = 1; i <= 7; i++){
    //         document.querySelector('.day' + h + i).checked = false;
    //         document.querySelector('.s' + h + i).value = '';
    //         document.querySelector('.e' + h + i).value = '';
    //     }
    // }
    formPeriodList.innerHTML = 
    `
    <div class="form-period-list">
        <div class="form-control-period">
            <h3>period: </h3>
            <div class="form-control-period-content">
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}1">
                    Monday
                    <input type="text" class="form-control-period-start s${formSessionCount}1" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}1" placeholder="end time (e.g. 15:35)">
                </div>
                <br> 
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}2">
                    Tuesday
                    <input type="text" class="form-control-period-start s${formSessionCount}2" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}2" placeholder="end time (e.g. 15:35)">
                </div>
                <br>
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}3">
                    Wednesday
                    <input type="text" class="form-control-period-start s${formSessionCount}3" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}3" placeholder="end time (e.g. 15:35)">
                </div>
                <br>
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}4">
                    Thursday
                    <input type="text" class="form-control-period-start s${formSessionCount}4" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}4" placeholder="end time (e.g. 15:35)">
                </div>
                <br>
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}5">
                    Friday
                    <input type="text" class="form-control-period-start s${formSessionCount}5" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}5" placeholder="end time (e.g. 15:35)">
                </div>
                <br>
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}6">
                    Saturday
                    <input type="text" class="form-control-period-start s${formSessionCount}6" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}6" placeholder="end time (e.g. 15:35)">
                </div>
                <br>
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}7">
                    Sunday
                    <input type="text" class="form-control-period-start s${formSessionCount}7" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}7" placeholder="end time (e.g. 15:35)">
                </div>
            </div>                    
        </div>
    </div>
    `
    closeCoursePage();

    console.log(course);
    console.log(course.length);
}



// add period ------------------------------------------------------------------------------------------------------------------------------------
function addPeriod(e) {
    e.preventDefault(); 
    formSessionCount++;

    formPeriodList.insertAdjacentHTML("beforeend", 
    `
    <div class="form-period-list">
        <div class="form-control-period">
            <h3>period: </h3>
            <div class="form-control-period-content">
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}1">
                    Monday
                    <input type="text" class="form-control-period-start s${formSessionCount}1" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}1" placeholder="end time (e.g. 15:35)">
                </div>
                <br> 
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}2">
                    Tuesday
                    <input type="text" class="form-control-period-start s${formSessionCount}2" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}2" placeholder="end time (e.g. 15:35)">
                </div>
                <br>
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}3">
                    Wednesday
                    <input type="text" class="form-control-period-start s${formSessionCount}3" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}3" placeholder="end time (e.g. 15:35)">
                </div>
                <br>
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}4">
                    Thursday
                    <input type="text" class="form-control-period-start s${formSessionCount}4" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}4" placeholder="end time (e.g. 15:35)">
                </div>
                <br>
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}5">
                    Friday
                    <input type="text" class="form-control-period-start s${formSessionCount}5" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}5" placeholder="end time (e.g. 15:35)">
                </div>
                <br>
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}6">
                    Saturday
                    <input type="text" class="form-control-period-start s${formSessionCount}6" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}6" placeholder="end time (e.g. 15:35)">
                </div>
                <br>
                <div class="form-control-period-day">
                    <input type="checkbox" class="day${formSessionCount}7">
                    Sunday
                    <input type="text" class="form-control-period-start s${formSessionCount}7" placeholder="start time (e.g. 14:20)">
                    <input type="text" class="form-control-period-end e${formSessionCount}7" placeholder="end time (e.g. 15:35)">
                </div>
            </div>                    
        </div>
    </div>
    `
    );
    
}

// open and close pages
function closeCoursePage() {
    addCoursePage.style.display = "none";
}
function openCoursePage() {
    addCoursePage.style.display = "block";
}










// generate schedule --------------------------------------------------------------------------
const generate = document.querySelector('.generate-schedule');

// event listener
generate.addEventListener('click', generateSchedule);


function generateSchedule(e) {
    e.preventDefault();
    let validScheduleList = [];
    let validSchedule = [];


    if (course.length !== 2) {
        return
    }
    for(let a = 0; a <= course[0][0]; a++) {
        for (let b = 0; b < course[1][0]; b++){
            let firstStart = (course[0][2][1] < course[1][2][2]) && (course[0][2][1] > course[1][2][1])
            let firstEnd = (course[0][2][2] < course[1][2][2]) && (course[0][2][2] > course[1][2][1])
            if(course[1][2][1] < course[0][2][1]){
                if (course[1][2][2][b+1] > course[0][2][1][a+1])
                    continue;
            } 
            else {
                if (course[1][2][1][b+1] < course[0][2][2][a+1])
                    continue
            }
            // for (let c = 0; c < course[2][0]; c++){

            // }
            console.log("success")
        }
    }
}