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
        for(let i = 1; i <= 7; i++){
            if(document.querySelector('.day' + j + i).checked === true)
                break;
            if(i === 7){
                alert("Please fill out the schedule of all periods");
                return;
            }
        }
    }
    
    // reset draw schedule table
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

                let st = parseInt(session[x][1][y]);
                let et = parseInt(session[x][2][y]);

                let sh = String(Math.floor(st / 60));
                let sm = String(st % 60);
                let eh = String(Math.floor(et / 60));
                let em = String(et % 60);
                
                days += `${sh}:${sm} - ${eh}:${em} <br>`
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
    <div class="form-control-period">
        <h3>period: </h3>
        <div class="form-control-period-content">
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}1">
                Monday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}1" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}1" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}1" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}1" placeholder="0-60">
                </div>
            </div>
            <br> 
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}2">
                Tuesday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}2" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}2" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}2" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}2" placeholder="0-60">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}3">
                Wednesday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}3" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}3" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}3" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}3" placeholder="0-60">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}4">
                Thursday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}4" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}4" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}4" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}4" placeholder="0-60">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}5">
                Friday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}5" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}5" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}5" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}5" placeholder="0-60">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}6">
                Saturday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}6" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}6" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}6" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}6" placeholder="0-60">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}7">
                Sunday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}7" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}7" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}7" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}7" placeholder="0-60">
                </div>
            </div>
        </div>                    
    </div>

    `
    closeCoursePage();

    console.log(course);
    // console.log(course.length);
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
                    <input type="text" class="form-control-period-start s${formSessionCount}1" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}1" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}1" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}1" placeholder="0-60">
                </div>
            </div>
            <br> 
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}2">
                Tuesday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}2" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}2" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}2" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}2" placeholder="0-60">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}3">
                Wednesday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}3" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}3" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}3" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}3" placeholder="0-60">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}4">
                Thursday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}4" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}4" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}4" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}4" placeholder="0-60">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}5">
                Friday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}5" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}5" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}5" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}5" placeholder="0-60">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}6">
                Saturday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}6" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}6" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}6" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}6" placeholder="0-60">
                </div>
            </div>
            <br>
            <div class="form-control-period-day">
                <input type="checkbox" class="day${formSessionCount}7">
                Sunday
                <div class="hour-min">
                    class time:
                    <input type="text" class="form-control-period-start s${formSessionCount}7" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-start sm${formSessionCount}7" placeholder="0-60">
                    -
                    <input type="text" class="form-control-period-end e${formSessionCount}7" placeholder="6-22">
                    :
                    <input type="text" class="form-control-period-end em${formSessionCount}7" placeholder="0-60">
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
    let countLoop = 0;

    validScheduleList = [];

    
    generateRec(courseCount, courseCount, 0, pointerCount);
    console.log(validScheduleList);
    drawSchedule(validScheduleList, courseCount, index);



    function generateRec(n, m, currCourseNum, pointerCount) {        
        

        if (n >= 1){
            //initialize
            if (m === n){
                for (let pc = 0; pc < m; pc++)
                    pointerCount[pc] = 0;
            }
            // course[countLoop][0] = number of periods
            //for (let i = 0; i <= course[countLoop][0]; i++){
            for (let i = 0; i < course[currCourseNum][2].length; i++){
                countLoop = currCourseNum;
                pointerCount[countLoop] = i;
                generateRec(n - 1, m, currCourseNum + 1, pointerCount);
            }
        }
        else {
            checkOverlapAll(0, currCourseNum-1, pointerCount);            
        }

        function checkOverlapAll(x, countLoop, pointerCount) {
            
            if (x != countLoop) {
                for (let i = x+1; i <= countLoop; i++){
                    if(checkOverlap(x,i, pointerCount[x], pointerCount[i]) === true){
                        return;
                    }
                        
                }
                checkOverlapAll(x + 1, countLoop, pointerCount);
            }
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


    if (validScheduleList.length === 0)
        return console.log("no schedule generated!");

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

    for (let i = 0; i < courseCount; i++){
        for (let a = 1; a <= 7; a++){
            if (!(course[i][2][validScheduleList[index][i]][0][a])) continue;
            let st = course[i][2][validScheduleList[index][i]][1][a];
            let et = course[i][2][validScheduleList[index][i]][2][a];
            drawName = course[i][1];

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


