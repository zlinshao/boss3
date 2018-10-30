const GetDateList = function (){
    var arr = [];
    var date = new Date().toLocaleDateString();
    var year = date.split('/')[0];
    var month = date.split('/')[1];
    for(let j=1;j<=6;j++){
        var minusMonth = parseInt(month) + (j-7);
        var minusyear = year;
        if(minusMonth < 1){
            minusyear = parseInt(year) - 1;
            minusMonth = minusMonth + 12;
        }
        if(minusMonth<10){
            minusMonth = '0'+minusMonth;
        }
        arr.push({sort:j,date:`${minusyear}-${minusMonth}`,edit:false});
    }
    for(let i=0;i<6;i++){
        var addMonth = parseInt(month) + i;
        var addyear = year;
        if(addMonth >12 ){
            addyear = parseInt(year) + 1;
            addMonth = addMonth - 12;
        }
        if(addMonth<10){
            addMonth = '0'+addMonth;
        }
        arr.push({sort:i+5,date:`${addyear}-${addMonth}`,edit:true});
    }
    return arr;
}

export default GetDateList;