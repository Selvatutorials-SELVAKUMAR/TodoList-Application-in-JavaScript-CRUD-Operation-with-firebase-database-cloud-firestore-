class CurrentDay_Time{
    today
    day
    dayList
    month
    monthList
    Date
    year
    hour
    minute
    second
    am_pm
    initializeValues(){
        this.today = new Date()
        this.day =  this.today.getDay()
        this.dayList = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        this.monthList = ["Jan" , "Feb" , "Mar" , "Apr","May" , "June" , "July" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"]
        this.month = this.monthList[this.today.getMonth()]
        this.Date = this.today.getUTCDate()
        this.year = this.today.getUTCFullYear()
        this.hour =  this.today.getHours()
        this.minute =  this.today.getMinutes()
        this.second =  this.today.getSeconds()
        this.am_pm = (this.today.getHours() >= 12)? "PM" : "AM"
    }
    displayCurrentDay(){
        document.getElementById('day').textContent = `${this.dayList[this.day]} , ${this.month} ${this.Date} , ${this.year}`
    }
    takeTwelve(val){
        if(val > 12){
            return val-12
        } else {
            return val
        }
    }
    addZero(val){
        if(val < 10){
            return `0${val}`
        } else {
            return val
        }
    }
    displayCurrentTime(){
        document.getElementById('time').textContent = `Current Time = ${this.addZero(this.takeTwelve(this.hour))} : ${this.addZero(this.minute)} : ${this.addZero(this.second)} ${this.am_pm}`
    }
}

const Object = new CurrentDay_Time()
document.getElementsByTagName('button')[0].onclick = () => {
    Object.initializeValues()
    Object.displayCurrentDay()
    Object.displayCurrentTime()
    setInterval(() => {
        Object.initializeValues()
        Object.displayCurrentDay()
        Object.displayCurrentTime()
    },1000)
}