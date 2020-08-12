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
let validScheduleList = [];
let index = 0; //choose to see which generated schedule;

let sessionCount = []; //number of periods of each course
let formSessionCount = 0; //current course periods

let holdCourseList = []; //if course on hold, value = 1. 0 otherwise.
let holdPeriodList = []; //if course on hold, value = 1. 0 otherwise.

let courseAvalibleCount = 0;

// query selectors
const addCourseBtn = document.querySelector('.add-course-button');
const addPeriodBtn = document.querySelector('.add-period-button');

const closeCoursePageBtn = document.querySelector('.close-add-course-page');
const addCoursePage = document.querySelector('.add-course-page');

const scheduleTable = document.querySelector('.schedule-table');
const numPlan = document.querySelector('.number-plan');


// const submitCourse = document.querySelector('.submit-course-btn');

const submitForm = document.querySelector(".submit-course-btn");

const addSession = document.querySelector(".form-control-add-period");
const courseName = document.querySelector('.form-control-name-input');
const formPeriodList = document.querySelector('.form-period-list');

const requiredName = document.querySelector('.required-name');


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
    

    let name = courseName.value;

    // if there is no name, then no action
    if(name === '') {
        alert('Please tell us the name of this course!');
        requiredName.style.color = "red";
        return;
    }

    // if there is no actual period, then no action
    
    for (let j = 0; j <= formSessionCount; j++) {
        let emptyPeriod = true;
        for(let i = 1; i <= 7; i++){
            if(document.querySelector('.day' + j + i).checked === true){
                
                emptyPeriod = false;

                let sh = document.querySelector('.s' + j + i).value;
                let sm = document.querySelector('.sm' + j + i).value;
                let eh = document.querySelector('.e' + j + i).value;
                let em = document.querySelector('.em' + j + i).value;

                if(sh === '' || sm === '' || eh === '' || em === ''){
                    alert('Please fill out the time for each day you have selected');
                    return;
                }

                if (sh < 6){
                    if(sh < 0){
                        alert('invalid input, hour should in range of 0 - 23. Please correct it');
                        return;
                    }
                    alert('really?! Your class start before 6a.m.? Drop that period, you need more sleep!');
                    return;
                }
                if (eh > 22){
                    if(eh > 23){
                        alert('invalid input, hour should in range of 0 - 23. Please correct it');
                        return;
                    }
                    alert('Be nice to yourself. Do not take any class after 10p.m. It is time to go to bed!');
                    return;
                }
                if (sm < 0 || em < 0 || sm > 60 || em > 60) {
                    alert('invalid input, make sure minutes are in range of 0 - 59');
                    return;
                }



                document.querySelector('.s' + j + i).disabled = false;
                document.querySelector('.sm' + j + i).disabled = false;

            }
            
        }
        if(emptyPeriod === true){
            alert("Make sure all there is no empty period!");
            return;
        }
    }
    
    // reset draw schedule table
    resetScheduleTable();

    let session = [];


    for (let j = 0; j <= formSessionCount; j++) {
        let object = {};
        let day = [];
        let startTime = [];
        let endTime = [];
        for (let i = 1; i <= 7; i++){
            day[i] = document.querySelector('.day' + j + i).checked;

            //time
            sh = parseInt(document.querySelector('.s' + j + i).value);
            sm = parseInt(document.querySelector('.sm' + j + i).value);
            startTime[i] = sh*60 + sm;

            eh = parseInt(document.querySelector('.e' + j + i).value);
            em = parseInt(document.querySelector('.em' + j + i).value);
            endTime[i] = eh*60 + em;

            // check if end time is ealier than start time, if true, return
            if(sh > eh){
                alert('invalid input! class end time should not be ealier than or equal class start time!!!')
                return;
            }
            if(sh === eh) {
                if(sm >= em) {
                    alert('invalid input! class end time should not be ealier than or equal class start time!!!')
                    return;
                }
            }
        }
        object[0] = day;
        object[1] = startTime;
        object[2] = endTime;
        session.push(object);

        // number of periods in each course
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
            <div class="add-hold-delete">                
                <button class="add-period-button">Add Period</button>
                <button class="hold-period-button">Hold Course</button>
                <button class="delete-period-button">Delete Course</button>
            </div>
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
        days += 
        `
        <div class="delete-hold">
            <button class="hold-period"> Hold </button>
            <button class="delete-period"> X </button>
        </div>
        `
        days += `<div class="display-period-info">`;
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

                let st = parseInt(session[x][1][y]);
                let et = parseInt(session[x][2][y]);

                let sh = String(Math.floor(st / 60));
                let sm = String(st % 60);
                let eh = String(Math.floor(et / 60));
                let em = String(et % 60);
                
                days += `${sh}:${sm} - ${eh}:${em} <br>`
            }
        }
        days += `</div>`;
        return days;
    }


    //reset
    closeCoursePage();

    console.log(course);



}



// add period ------------------------------------------------------------------------------------------------------------------------------------
function addPeriod(e) {
    e.preventDefault(); 
    formSessionCount++;

    formPeriodList.insertAdjacentHTML("beforeend", 
    `
    <div class="form-control-period">
        <h3>period: </h3>
        <div class="form-control-period-content">
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}1">
                Monday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}1" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}1" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}1" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}1" placeholder="" disabled="disabled">
                </div>
            </div>
            <br> 
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}2">
                Tuesday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}2" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}2" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}2" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}2" placeholder="" disabled="disabled">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}3">
                Wednesday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}3" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}3" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}3" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}3" placeholder="" disabled="disabled">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}4">
                Thursday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}4" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}4" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}4" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}4" placeholder="" disabled="disabled">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}5">
                Friday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}5" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}5" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}5" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}5" placeholder="" disabled="disabled">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}6">
                Saturday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}6" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}6" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}6" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}6" placeholder="" disabled="disabled">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}7">
                Sunday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}7" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}7" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}7" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}7" placeholder="" disabled="disabled">
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
    formSessionCount = 0;
    courseName.value = '';
    formPeriodList.innerHTML = 
    `
    <div class="form-control-period">
        <h3>period: </h3>
        <div class="form-control-period-content">
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}1">
                Monday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}1" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}1" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}1" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}1" placeholder="" disabled="disabled">
                </div>
            </div>
            <br> 
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}2">
                Tuesday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}2" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}2" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}2" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}2" placeholder="" disabled="disabled">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}3">
                Wednesday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}3" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}3" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}3" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}3" placeholder="" disabled="disabled">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}4">
                Thursday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}4" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}4" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}4" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}4" placeholder="" disabled="disabled">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}5">
                Friday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}5" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}5" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}5" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}5" placeholder="" disabled="disabled">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}6">
                Saturday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}6" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}6" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}6" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}6" placeholder="" disabled="disabled">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}7">
                Sunday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}7" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}7" placeholder="" disabled="disabled">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}7" placeholder="" disabled="disabled">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}7" placeholder="" disabled="disabled">
                </div>
            </div>
        </div>                    
    </div>

    `
}
function openCoursePage() {
    requiredName.style.color = "black";
    addCoursePage.style.display = "block";
}










// generate schedule --------------------------------------------------------------------------
const generate = document.querySelector('.generate-schedule');

// event listener
generate.addEventListener('click', generateSchedule);


function generateSchedule(e) {
    e.preventDefault();

    index = 0;


    let pointerCount = [];

    validScheduleList = [];

    // figure out whether could is hold or not
    // course
    let holdCount = 0;
    for(let pointerHoldCourse = 0; pointerHoldCourse < courseCount; pointerHoldCourse++){
        if (courseList.children[pointerHoldCourse].classList[1] === 'hold'){
            holdCourseList[pointerHoldCourse] = 1;
            holdCount++;
        }
        else {
            holdCourseList[pointerHoldCourse] = 0;
        }
    }
    // period
    holdPeriodList = [];
    for(let pointerHoldCourse = 0; pointerHoldCourse < courseCount; pointerHoldCourse++){
        let tempArr = [];
        for (let pointerHoldPeriod = 0; pointerHoldPeriod < course[pointerHoldCourse][2].length; pointerHoldPeriod++){
            let currCourse = courseList.children[pointerHoldCourse];
            let currPeriod = currCourse.children[1].children[pointerHoldPeriod];
            if (currPeriod.classList[1] === 'hold'){
                tempArr[pointerHoldPeriod] = 1;
            }
            else {
                tempArr[pointerHoldPeriod] = 0;
            }
        }
        holdPeriodList.push(tempArr);
    }


    // number of course is up ready
    courseAvalibleCount = courseCount - holdCount;

    generateRec(courseAvalibleCount, courseAvalibleCount, 0, 0, pointerCount);
    console.log(validScheduleList);
    drawSchedule(validScheduleList, courseCount, index);


    // courseNum match to course index; currCourseNum mathch to pointerCount index
    
    function generateRec(n, m, currCourseNum, courseNum, pointerCount) {     
       
        if (n >= 1){
            //initialize
            if (m === n){
                for (let pc = 0; pc < m; pc++)
                    pointerCount[pc] = 0;
            }
            
            while (holdCourseList[courseNum] !== 0){
                if(courseNum >= courseCount-1){
                    return;
                }
                courseNum++;
            }

            for (let i = 0; i < course[courseNum][2].length; i++){
                //if current period is on hold, then contintue to next period
                if (holdPeriodList[courseNum][i] !== 0)
                    continue;

                pointerCount[currCourseNum] = i;
                generateRec(n - 1, m, currCourseNum + 1, courseNum + 1, pointerCount);
            }
        }
        else {
            checkOverlapAll(0, 0, courseNum-1, pointerCount);            
        }

        // cx = course index, x = index of pointerCount correspond to cx, cousrNum number of ready course (count start at index 0)
        function checkOverlapAll(x, cx, courseNum, pointerCount) {
            while (holdCourseList[cx] !== 0) {
                if(cx >= courseCount-1){
                    return;
                }
                cx++;
            }
            // cx = 1  courseNum = 1
            if (cx != courseNum) {
                let i = x;

                
                for (let ci = cx+1; ci <= courseNum; ci++){
                    if (holdCourseList[ci] !== 0) {
                        if (ci >= courseCount-1){
                            return;
                        }
                        continue;
                    } 
                    i++;
                    if(checkOverlap(cx, ci, pointerCount[x], pointerCount[i]) === true){
                        return;
                    }
                        
                }
                
                checkOverlapAll(x+1, cx + 1, courseNum, pointerCount);
            }
            // pointerCount = [[0]]
            else{
                pointerCount = Object.values(pointerCount);
                validScheduleList.push(pointerCount);

            }
        }
    }

    function checkOverlap(x,y,xp,yp) {
        

        let xStart = course[x][2][xp][1];
        let xEnd = course[x][2][xp][2];
        let yStart = course[y][2][yp][1];
        let yEnd = course[y][2][yp][2];

        for (let a = 1; a <= 7; a++){
            if (!(course[x][2][xp][0][a] && course[y][2][yp][0][a])){
                continue;
            }

            let isOverlap = (parseInt(xStart[a]) < parseInt(yEnd[a])) && (parseInt(xEnd[a]) > parseInt(yStart[a]))

            if (isOverlap){
                return true;
            }
            
        }
        return false;
            
    }



}

//draw schedule 
function drawSchedule(validScheduleList, courseCount, index){


    if (validScheduleList.length === 0){
	alert("no schedule generated!");
        return console.log("no schedule generated!");
    }

    scheduleTable.innerHTML = 
    `
    <div class="table-header">
        <div class="table-header-extra"></div>
        <div class="table-header-day">Monday</div>
        <div class="table-header-day">Tuesday</div>
        <div class="table-header-day">Wednesday</div>
        <div class="table-header-day">Thursday</div>
        <div class="table-header-day">Friday</div>
        <div class="table-header-day">Saturday</div>
        <div class="table-header-day">Sunday</div>
    </div>
    <div class="schedule-table-inside">
        <div class="table-time">
            <div class="hour 6">6:00</div>
            <div class="hour 7">7:00</div>
            <div class="hour 8">8:00</div>
            <div class="hour 9">9:00</div>
            <div class="hour 10">10:00</div>
            <div class="hour 11">11:00</div>
            <div class="hour 12">12:00</div>
            <div class="hour 13">13:00</div>
            <div class="hour 14">14:00</div>
            <div class="hour 15">15:00</div>
            <div class="hour 16">16:00</div>
            <div class="hour 17">17:00</div>
            <div class="hour 18">18:00</div>
            <div class="hour 19">19:00</div>
            <div class="hour 20">20:00</div>
            <div class="hour 21">21:00</div>
            <div class="hour 22">22:00</div>
        </div>
        <!-- monday -->
        <div class="table-day monday">
            <div class="hour t1-6"></div>
            <div class="hour t1-7"></div>
            <div class="hour t1-8"></div>
            <div class="hour t1-9"></div>
            <div class="hour t1-10"></div>
            <div class="hour t1-11"></div>
            <div class="hour t1-12"></div>
            <div class="hour t1-13"></div>
            <div class="hour t1-14"></div>
            <div class="hour t1-15"></div>
            <div class="hour t1-16"></div>
            <div class="hour t1-17"></div>
            <div class="hour t1-18"></div>
            <div class="hour t1-19"></div>
            <div class="hour t1-20"></div>
            <div class="hour t1-21"></div>
            <div class="hour t1-22"></div>
        </div>
        <!-- tuesday -->
        <div class="table-day tuesday">
            <div class="hour t2-6"></div>
            <div class="hour t2-7"></div>
            <div class="hour t2-8"></div>
            <div class="hour t2-9"></div>
            <div class="hour t2-10"></div>
            <div class="hour t2-11"></div>
            <div class="hour t2-12"></div>
            <div class="hour t2-13"></div>
            <div class="hour t2-14"></div>
            <div class="hour t2-15"></div>
            <div class="hour t2-16"></div>
            <div class="hour t2-17"></div>
            <div class="hour t2-18"></div>
            <div class="hour t2-19"></div>
            <div class="hour t2-20"></div>
            <div class="hour t2-21"></div>
            <div class="hour t2-22"></div>
        </div>
        <!-- wednesday -->
        <div class="table-day wednesday">
            <div class="hour t3-6"></div>
            <div class="hour t3-7"></div>
            <div class="hour t3-8"></div>
            <div class="hour t3-9"></div>
            <div class="hour t3-10"></div>
            <div class="hour t3-11"></div>
            <div class="hour t3-12"></div>
            <div class="hour t3-13"></div>
            <div class="hour t3-14"></div>
            <div class="hour t3-15"></div>
            <div class="hour t3-16"></div>
            <div class="hour t3-17"></div>
            <div class="hour t3-18"></div>
            <div class="hour t3-19"></div>
            <div class="hour t3-20"></div>
            <div class="hour t3-21"></div>
            <div class="hour t3-22"></div>
        </div>
        <!-- thursday -->
        <div class="table-day thursday">
            <div class="hour t4-6"></div>
            <div class="hour t4-7"></div>
            <div class="hour t4-8"></div>
            <div class="hour t4-9"></div>
            <div class="hour t4-10"></div>
            <div class="hour t4-11"></div>
            <div class="hour t4-12"></div>
            <div class="hour t4-13"></div>
            <div class="hour t4-14"></div>
            <div class="hour t4-15"></div>
            <div class="hour t4-16"></div>
            <div class="hour t4-17"></div>
            <div class="hour t4-18"></div>
            <div class="hour t4-19"></div>
            <div class="hour t4-20"></div>
            <div class="hour t4-21"></div>
            <div class="hour t4-22"></div>
        </div>
        <!-- friday -->
        <div class="table-day friday">
            <div class="hour t5-6"></div>
            <div class="hour t5-7"></div>
            <div class="hour t5-8"></div>
            <div class="hour t5-9"></div>
            <div class="hour t5-10"></div>
            <div class="hour t5-11"></div>
            <div class="hour t5-12"></div>
            <div class="hour t5-13"></div>
            <div class="hour t5-14"></div>
            <div class="hour t5-15"></div>
            <div class="hour t5-16"></div>
            <div class="hour t5-17"></div>
            <div class="hour t5-18"></div>
            <div class="hour t5-19"></div>
            <div class="hour t5-20"></div>
            <div class="hour t5-21"></div>
            <div class="hour t5-22"></div>
        </div>
        <!-- saturday -->
        <div class="table-day saturday">
            <div class="hour t6-6"></div>
            <div class="hour t6-7"></div>
            <div class="hour t6-8"></div>
            <div class="hour t6-9"></div>
            <div class="hour t6-10"></div>
            <div class="hour t6-11"></div>
            <div class="hour t6-12"></div>
            <div class="hour t6-13"></div>
            <div class="hour t6-14"></div>
            <div class="hour t6-15"></div>
            <div class="hour t6-16"></div>
            <div class="hour t6-17"></div>
            <div class="hour t6-18"></div>
            <div class="hour t6-19"></div>
            <div class="hour t6-20"></div>
            <div class="hour t6-21"></div>
            <div class="hour t6-22"></div>
        </div>
        <!-- sunday -->
        <div class="table-day sunday">
            <div class="hour t7-6"></div>
            <div class="hour t7-7"></div>
            <div class="hour t7-8"></div>
            <div class="hour t7-9"></div>
            <div class="hour t7-10"></div>
            <div class="hour t7-11"></div>
            <div class="hour t7-12"></div>
            <div class="hour t7-13"></div>
            <div class="hour t7-14"></div>
            <div class="hour t7-15"></div>
            <div class="hour t7-16"></div>
            <div class="hour t7-17"></div>
            <div class="hour t7-18"></div>
            <div class="hour t7-19"></div>
            <div class="hour t7-20"></div>
            <div class="hour t7-21"></div>
            <div class="hour t7-22"></div>
        </div>
    </div>
    `

    // ci = index of course in array; i = index of validScheduleList
    let i = -1;
    loop1:
    for (let ci = 0; ci < courseCount; ci++){
        while (holdCourseList[ci] !== 0){
            if(ci >= courseCount-1){
                break loop1;
            }
            ci++;
        }
        i++;
        for (let a = 1; a <= 7; a++){
            if (!(course[ci][2][validScheduleList[index][i]][0][a])) continue;
            let st = course[ci][2][validScheduleList[index][i]][1][a];
            let et = course[ci][2][validScheduleList[index][i]][2][a];
            drawName = course[ci][1];

            let stringDay = String(a);
            let stringST = String(Math.floor(st / 60)); 
            const drawPeriod = document.querySelector(".t"+stringDay+"-"+stringST);

            let sh = String(Math.floor(st / 60));
            let sm = String(st % 60);
            let eh = String(Math.floor(et / 60));
            let em = String(et % 60);
            

            drawPeriod.innerHTML += 
            `   
            <div class="draw-color">
                <div class="draw-course-color">${drawName} </div> <br>
                ${sh}:${sm} - ${eh}:${em} <br>
            </div>
            `
        }
    }
    numPlan.innerHTML = 
    `
        ${index+1} of ${validScheduleList.length}
    `

}

// next and previous buttons -------------------------------------------------------
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");

nextBtn.addEventListener('click', () => {
    if (index >= validScheduleList.length-1) return; 
    index++; 
    drawSchedule(validScheduleList, courseCount, index);
});
previousBtn.addEventListener('click', () => { 
    if(index <= 0) return;
    index--; 
    drawSchedule(validScheduleList, courseCount, index);
});



// updating fields
setInterval(updateInput, 100);

function updateInput() {
    for (let j = 0; j <= formSessionCount; j++) {
        for(let i = 1; i <= 7; i++){
            if(document.querySelector('.day' + j + i).checked === true) {
                document.querySelector('.s' + j + i).disabled = false;
                document.querySelector('.sm' + j + i).disabled = false;
                document.querySelector('.e' + j + i).disabled = false;
                document.querySelector('.em' + j + i).disabled = false;
            }
            else {
                document.querySelector('.s' + j + i).disabled = true;
                document.querySelector('.sm' + j + i).disabled = true;
                document.querySelector('.e' + j + i).disabled = true;
                document.querySelector('.em' + j + i).disabled = true;
            }
                
        }
    }
}

//reset schedule table
function resetScheduleTable() {
    scheduleTable.innerHTML = 
    `
    <div class="table-header">
        <div class="table-header-extra"></div>
        <div class="table-header-day">Monday</div>
        <div class="table-header-day">Tuesday</div>
        <div class="table-header-day">Wednesday</div>
        <div class="table-header-day">Thursday</div>
        <div class="table-header-day">Friday</div>
        <div class="table-header-day">Saturday</div>
        <div class="table-header-day">Sunday</div>
    </div>
    <div class="schedule-table-inside">
        <div class="table-time">
            <div class="hour 6">6:00</div>
            <div class="hour 7">7:00</div>
            <div class="hour 8">8:00</div>
            <div class="hour 9">9:00</div>
            <div class="hour 10">10:00</div>
            <div class="hour 11">11:00</div>
            <div class="hour 12">12:00</div>
            <div class="hour 13">13:00</div>
            <div class="hour 14">14:00</div>
            <div class="hour 15">15:00</div>
            <div class="hour 16">16:00</div>
            <div class="hour 17">17:00</div>
            <div class="hour 18">18:00</div>
            <div class="hour 19">19:00</div>
            <div class="hour 20">20:00</div>
            <div class="hour 21">21:00</div>
            <div class="hour 22">22:00</div>
        </div>
        <!-- monday -->
        <div class="table-day monday">
            <div class="hour t1-6"></div>
            <div class="hour t1-7"></div>
            <div class="hour t1-8"></div>
            <div class="hour t1-9"></div>
            <div class="hour t1-10"></div>
            <div class="hour t1-11"></div>
            <div class="hour t1-12"></div>
            <div class="hour t1-13"></div>
            <div class="hour t1-14"></div>
            <div class="hour t1-15"></div>
            <div class="hour t1-16"></div>
            <div class="hour t1-17"></div>
            <div class="hour t1-18"></div>
            <div class="hour t1-19"></div>
            <div class="hour t1-20"></div>
            <div class="hour t1-21"></div>
            <div class="hour t1-22"></div>
        </div>
        <!-- tuesday -->
        <div class="table-day tuesday">
            <div class="hour t2-6"></div>
            <div class="hour t2-7"></div>
            <div class="hour t2-8"></div>
            <div class="hour t2-9"></div>
            <div class="hour t2-10"></div>
            <div class="hour t2-11"></div>
            <div class="hour t2-12"></div>
            <div class="hour t2-13"></div>
            <div class="hour t2-14"></div>
            <div class="hour t2-15"></div>
            <div class="hour t2-16"></div>
            <div class="hour t2-17"></div>
            <div class="hour t2-18"></div>
            <div class="hour t2-19"></div>
            <div class="hour t2-20"></div>
            <div class="hour t2-21"></div>
            <div class="hour t2-22"></div>
        </div>
        <!-- wednesday -->
        <div class="table-day wednesday">
            <div class="hour t3-6"></div>
            <div class="hour t3-7"></div>
            <div class="hour t3-8"></div>
            <div class="hour t3-9"></div>
            <div class="hour t3-10"></div>
            <div class="hour t3-11"></div>
            <div class="hour t3-12"></div>
            <div class="hour t3-13"></div>
            <div class="hour t3-14"></div>
            <div class="hour t3-15"></div>
            <div class="hour t3-16"></div>
            <div class="hour t3-17"></div>
            <div class="hour t3-18"></div>
            <div class="hour t3-19"></div>
            <div class="hour t3-20"></div>
            <div class="hour t3-21"></div>
            <div class="hour t3-22"></div>
        </div>
        <!-- thursday -->
        <div class="table-day thursday">
            <div class="hour t4-6"></div>
            <div class="hour t4-7"></div>
            <div class="hour t4-8"></div>
            <div class="hour t4-9"></div>
            <div class="hour t4-10"></div>
            <div class="hour t4-11"></div>
            <div class="hour t4-12"></div>
            <div class="hour t4-13"></div>
            <div class="hour t4-14"></div>
            <div class="hour t4-15"></div>
            <div class="hour t4-16"></div>
            <div class="hour t4-17"></div>
            <div class="hour t4-18"></div>
            <div class="hour t4-19"></div>
            <div class="hour t4-20"></div>
            <div class="hour t4-21"></div>
            <div class="hour t4-22"></div>
        </div>
        <!-- friday -->
        <div class="table-day friday">
            <div class="hour t5-6"></div>
            <div class="hour t5-7"></div>
            <div class="hour t5-8"></div>
            <div class="hour t5-9"></div>
            <div class="hour t5-10"></div>
            <div class="hour t5-11"></div>
            <div class="hour t5-12"></div>
            <div class="hour t5-13"></div>
            <div class="hour t5-14"></div>
            <div class="hour t5-15"></div>
            <div class="hour t5-16"></div>
            <div class="hour t5-17"></div>
            <div class="hour t5-18"></div>
            <div class="hour t5-19"></div>
            <div class="hour t5-20"></div>
            <div class="hour t5-21"></div>
            <div class="hour t5-22"></div>
        </div>
        <!-- saturday -->
        <div class="table-day saturday">
            <div class="hour t6-6"></div>
            <div class="hour t6-7"></div>
            <div class="hour t6-8"></div>
            <div class="hour t6-9"></div>
            <div class="hour t6-10"></div>
            <div class="hour t6-11"></div>
            <div class="hour t6-12"></div>
            <div class="hour t6-13"></div>
            <div class="hour t6-14"></div>
            <div class="hour t6-15"></div>
            <div class="hour t6-16"></div>
            <div class="hour t6-17"></div>
            <div class="hour t6-18"></div>
            <div class="hour t6-19"></div>
            <div class="hour t6-20"></div>
            <div class="hour t6-21"></div>
            <div class="hour t6-22"></div>
        </div>
        <!-- sunday -->
        <div class="table-day sunday">
            <div class="hour t7-6"></div>
            <div class="hour t7-7"></div>
            <div class="hour t7-8"></div>
            <div class="hour t7-9"></div>
            <div class="hour t7-10"></div>
            <div class="hour t7-11"></div>
            <div class="hour t7-12"></div>
            <div class="hour t7-13"></div>
            <div class="hour t7-14"></div>
            <div class="hour t7-15"></div>
            <div class="hour t7-16"></div>
            <div class="hour t7-17"></div>
            <div class="hour t7-18"></div>
            <div class="hour t7-19"></div>
            <div class="hour t7-20"></div>
            <div class="hour t7-21"></div>
            <div class="hour t7-22"></div>
        </div>
    </div>
    `
    numPlan.innerHTML = ``
    validScheduleList = [];
    index = 0;
}



// delete a period or a course ------------------------------------------------

const courseListDiv = document.querySelector('.course-list');

const addPeriodPage = document.querySelector('.add-period-page');
const submitPeriodBtn = document.querySelector('.submit-period-btn');
const closeAddPeriodBtn = document.querySelector('.close-add-period-page');
const formControlPeriodAdd = document.querySelector('.form-control-period-add');


courseListDiv.addEventListener('click', deleteCheck);


function deleteCheck(e) {
    const item = e.target;


    // delete period
    if(item.classList[0] === 'delete-period'){
        let listPeriodItem = item.parentElement.parentElement;
        let listCourseItem = listPeriodItem.parentElement.parentElement;
        const listPeriodItemConst = listPeriodItem;
        const listCourseItemConst = listCourseItem;


        //get idex of course and period
        let listPeriodIndex = 0;
        while( listPeriodItem.previousElementSibling != null){
            listPeriodIndex++;
            listPeriodItem = listPeriodItem.previousElementSibling;
        }
        
        let listCourseIndex = 0;
        while (listCourseItem.previousElementSibling != null){
            listCourseIndex++;
            listCourseItem = listCourseItem.previousElementSibling;
        }

        // remove frmm array and subtract count by one
        course[listCourseIndex][2].splice(listPeriodIndex, 1);
        sessionCount[listCourseIndex]--;


        //remove from display
        listPeriodItemConst.remove();
        
        // If there is no period left, then delete whole course directly
        if(listCourseItemConst.children[1].children.length < 1){
            course.splice(listCourseIndex, 1);
            listCourseItemConst.remove();
            courseCount--;
        }

        // make schedule table empty
        resetScheduleTable();

        return;
    }

    // Delete Course
    if(item.classList[0] === 'delete-period-button'){
        let listCourseItem = item.parentElement.parentElement.parentElement;
        const listCourseItemConst = listCourseItem;

        let listCourseIndex = 0;
        while (listCourseItem.previousElementSibling != null){
            listCourseIndex++;
            listCourseItem = listCourseItem.previousElementSibling;
        }

        course.splice(listCourseIndex, 1);
        listCourseItemConst.remove();
        courseCount--;

        // make schedule table empty
        resetScheduleTable();

        return;
    }

    // Add period in a course
    if(item.classList[0] === 'add-period-button'){
        let listCourseItem = item.parentElement.parentElement.parentElement;
        const listCourseItemConst = listCourseItem;

        let listCourseIndex = 0;
        while (listCourseItem.previousElementSibling != null){
            listCourseIndex++;
            listCourseItem = listCourseItem.previousElementSibling;
        }
        
        
        closeAddPeriodBtn.addEventListener('click', closePeriodPage);
        submitPeriodBtn.addEventListener('click', addPeriodToCurrentCourse);


        function openPeriodPage() {
            addPeriodPage.style.display = "block";
        }
        function closePeriodPage() {
            addPeriodPage.style.display = "none";
            formControlPeriodAdd.innerHTML = 
            `
            <div class="form-control-period-add">
                <div class="form-control-period-content">
                    <div class="form-control-period-day">
                        <input type="checkbox" class="day1">
                        Monday
                        <div class="hour-min">
                            class time:
                            <input type="text" class="form-control-period-start s1" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-start sm1" placeholder="" disabled="disabled">
                            -
                            <input type="text" class="form-control-period-end e1" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-end em1" placeholder="" disabled="disabled">
                        </div>
                    </div>
                    <br> 
                    <div class="form-control-period-day">
                        <input type="checkbox" class="day2">
                        Tuesday
                        <div class="hour-min">
                            class time:
                            <input type="text" class="form-control-period-start s2" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-start sm2" placeholder="" disabled="disabled">
                            -
                            <input type="text" class="form-control-period-end e2" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-end em2" placeholder="" disabled="disabled">
                        </div>
                    </div>
                    <br>
                    <div class="form-control-period-day">
                        <input type="checkbox" class="day3">
                        Wednesday
                        <div class="hour-min">
                            class time:
                            <input type="text" class="form-control-period-start s3" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-start sm3" placeholder="" disabled="disabled">
                            -
                            <input type="text" class="form-control-period-end e3" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-end em3" placeholder="" disabled="disabled">
                        </div>
                    </div>
                    <br>
                    <div class="form-control-period-day">
                        <input type="checkbox" class="day4">
                        Thursday
                        <div class="hour-min">
                            class time:
                            <input type="text" class="form-control-period-start s4" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-start sm4" placeholder="" disabled="disabled">
                            -
                            <input type="text" class="form-control-period-end e4" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-end em4" placeholder="" disabled="disabled">
                        </div>
                    </div>
                    <br>
                    <div class="form-control-period-day">
                        <input type="checkbox" class="day5">
                        Friday
                        <div class="hour-min">
                            class time:
                            <input type="text" class="form-control-period-start s5" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-start sm5" placeholder="" disabled="disabled">
                            -
                            <input type="text" class="form-control-period-end e5" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-end em5" placeholder="" disabled="disabled">
                        </div>
                    </div>
                    <br>
                    <div class="form-control-period-day">
                        <input type="checkbox" class="day6">
                        Saturday
                        <div class="hour-min">
                            class time:
                            <input type="text" class="form-control-period-start s6" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-start sm6" placeholder="" disabled="disabled">
                            -
                            <input type="text" class="form-control-period-end e6" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-end em6" placeholder="" disabled="disabled">
                        </div>
                    </div>
                    <br>
                    <div class="form-control-period-day">
                        <input type="checkbox" class="day7">
                        Sunday
                        <div class="hour-min">
                            class time:
                            <input type="text" class="form-control-period-start s7" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-start sm7" placeholder="" disabled="disabled">
                            -
                            <input type="text" class="form-control-period-end e7" placeholder="" disabled="disabled">
                            :
                            <input type="text" class="form-control-period-end em7" placeholder="" disabled="disabled">
                        </div>
                    </div>
                </div>                    
            </div>
            `
            return;
        }
        

        openPeriodPage();

        // update period
        setInterval(updatePeriod, 100);

        function updatePeriod() {
            for(let i = 1; i <= 7; i++){
                if(document.querySelector('.day' + i).checked === true) {
                    document.querySelector('.s' + i).disabled = false;
                    document.querySelector('.sm' + i).disabled = false;
                    document.querySelector('.e' + i).disabled = false;
                    document.querySelector('.em' + i).disabled = false;
                }
                else {
                    document.querySelector('.s' + i).disabled = true;
                    document.querySelector('.sm' + i).disabled = true;
                    document.querySelector('.e' + i).disabled = true;
                    document.querySelector('.em' + i).disabled = true;
                }
                    
            }
        }

        function addPeriodToCurrentCourse(e) {
            // delete event listener instantly
            e.target.removeEventListener(e.type, arguments.callee);

            //check if user had valid input
            let emptyPeriod = true;
            for(let i = 1; i <= 7; i++){
                if(document.querySelector('.day' + i).checked === true){
                    emptyPeriod = false;

                    let sh = document.querySelector('.s' + i).value;
                    let sm = document.querySelector('.sm' + i).value;
                    let eh = document.querySelector('.e' + i).value;
                    let em = document.querySelector('.em' + i).value;

                    if(sh === '' || sm === '' || eh === '' || em === ''){
                        alert('Please fill out the time for each day you have selected');
                        e.target.addEventListener(e.type, arguments.callee);
                        return;
                    }

                    if (sh < 6){
                        if(sh < 0){
                            alert('invalid input, hour should in range of 0 - 23. Please correct it');
                            e.target.addEventListener(e.type, arguments.callee);
                            return;
                        }
                        alert('really?! Your class start before 6a.m.? Drop that period, you need more sleep!');
                        e.target.addEventListener(e.type, arguments.callee);
                        return;
                    }
                    if (eh > 22){
                        if(eh > 23){
                            alert('invalid input, hour should in range of 0 - 23. Please correct it');
                            e.target.addEventListener(e.type, arguments.callee);
                            return;
                        }
                        alert('Be nice to yourself. Do not take any class after 10p.m. It is time to go to bed!');
                        e.target.addEventListener(e.type, arguments.callee);
                        return;
                    }
                    
                    if (sm < 0 || em < 0 || sm > 60 || em > 60) {
                        alert('invalid input, make sure minutes are in range of 0 - 59');
                        e.target.addEventListener(e.type, arguments.callee);
                        return;
                    }

                }
            }
            if(emptyPeriod === true){
                alert("Make sure period is not empty!");
                return;
            }


            // add to array
            let object = {};
            let day = [];
            let startTime = [];
            let endTime = [];
            for (let i = 1; i <= 7; i++){
                day[i] = document.querySelector('.day' + i).checked;
    
                //time
                sh = parseInt(document.querySelector('.s' + i).value);
                sm = parseInt(document.querySelector('.sm' + i).value);
                startTime[i] = sh*60 + sm;
    
                eh = parseInt(document.querySelector('.e' + i).value);
                em = parseInt(document.querySelector('.em' + i).value);
                endTime[i] = eh*60 + em;
    
                // check if end time is ealier than start time, if true, return
                if(sh > eh){
                    alert('invalid input! class end time should not be ealier than or equal class start time!!!')
                    e.target.addEventListener(e.type, arguments.callee);
                    return;
                }
                if(sh === eh) {
                    if(sm >= em) {
                        alert('invalid input! class end time should not be ealier than or equal class start time!!!')
                        e.target.addEventListener(e.type, arguments.callee);
                        return;
                    }
                }
                


            }
            object[0] = day;
            object[1] = startTime;
            object[2] = endTime;
            course[listCourseIndex][2].push(object);
    
            // add one period count to current period
            sessionCount[listCourseIndex]++;


            // add to screen
            const coursePeriodList = listCourseItemConst.children[1];
            coursePeriodList.innerHTML += 
            `
            <li class="list-item">
                <div class="delete-hold">
                    <button class="hold-period"> Hold </button>
                    <button class="delete-period"> X </button>
                </div>
                ${getDayTime()}
            </li>
            `
            function getDayTime() {
                let days = "";
                days += `<div class="display-period-info">`;
                for (let y = 1; y <= 7; y++){
                    if (course[listCourseIndex][2][sessionCount[listCourseIndex]][0][y] === true){
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
        
                        let st = parseInt(course[listCourseIndex][2][sessionCount[listCourseIndex]][1][y]);
                        let et = parseInt(course[listCourseIndex][2][sessionCount[listCourseIndex]][2][y]);
        
                        let sh = String(Math.floor(st / 60));
                        let sm = String(st % 60);
                        let eh = String(Math.floor(et / 60));
                        let em = String(et % 60);
                        
                        days += `${sh}:${sm} - ${eh}:${em} <br>`
                    }
                }
                days +=`</div>`;
                return days;
            }
    
            closePeriodPage();
        }

        resetScheduleTable();

        return;
    }

    // Hold Course
    if(item.classList[0] === 'hold-period-button'){
        let listCourseItem = item.parentElement.parentElement.parentElement;
        const listCourseItemConst = listCourseItem;

        let listCourseIndex = 0;
        while (listCourseItem.previousElementSibling != null){
            listCourseIndex++;
            listCourseItem = listCourseItem.previousElementSibling;
        }


        // toggle class
        listCourseItemConst.classList.toggle('hold');
        listCourseItemConst.children[1].classList.toggle('hold-actual1');
        listCourseItemConst.children[0].children[1].children[0].classList.toggle('hold-actual2');

        resetScheduleTable();
        return;
    }

    // Hold period
    if(item.classList[0] === 'hold-period'){
        let listPeriodItem = item.parentElement.parentElement;
        const listPeriodItemConst = listPeriodItem;


        //get idex of course and period
        let listPeriodIndex = 0;
        while( listPeriodItem.previousElementSibling != null){
            listPeriodIndex++;
            listPeriodItem = listPeriodItem.previousElementSibling;
        }

        // toggle class
        listPeriodItemConst.classList.toggle('hold');
        listPeriodItemConst.children[1].classList.toggle('hold-actual3');

        // make schedule table empty
        resetScheduleTable();

        return;
    }



}










