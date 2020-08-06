
var API = (() =>{

var jwtToken;
var authLogin = () => {
    const val = document.getElementById('user').value;
    try{
        fetch("http://localhost:8080/api/v1/login",{
            method: 'POST',
            body: JSON.stringify({
                username: val
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(resp => resp.json())
            .then(data => {
                jwtToken = data.token;
            });
        document.getElementById('user').value=''
        document.getElementById('alertMsglogin').style.display = 'block';
        setTimeout(() => {
            document.getElementById('alertMsglogin').style.display = 'none';
        }, 3000);
    } catch (e){
        console.log(e);
        console.log('_________________');
    }
    return false;
}

var createFilm = () => {
    var movie = document.getElementById('movie-name')
    var rating = document.getElementById('movie-rating')

    if((movie.value.trim()).length == 0){
        document.getElementById('movie-name').value=''
        document.getElementById('alertMsgMovie').style.display = 'block';
        setTimeout(() => {
            document.getElementById('alertMsgMovie').style.display = 'none';
        }, 3000);
        return false;
    }else if ((parseInt(rating.value)  < 1 ) || (parseInt(rating.value) > 5)) {
        document.getElementById('movie-rating').value=''
        document.getElementById('alertMsgRating').style.display = 'block';
        setTimeout(() => {
            document.getElementById('alertMsgRating').style.display = 'none';
        }, 3000);
        return false;
    }else{
        try{
            fetch("http://localhost:8080/api/v1/films",{
                method: 'POST',
                body: JSON.stringify({
                    name: movie.value,
                    rating:rating.value
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                }
            }).then(resp => {
                setTimeout(function() {
                    if(resp.status == 200){
                        document.getElementById('movie-name').value=''
                        document.getElementById('movie-rating').value=''
                        document.getElementById('alertMsgSave').style.display = 'block';
                        setTimeout(() => {
                            document.getElementById('alertMsgSave').style.display = 'none';
                        }, 3000);
                    } else {
                        document.getElementById('movie-name').value=''
                        document.getElementById('movie-rating').value=''
                        document.getElementById('alertMsg403').style.display = 'block';
                        setTimeout(() => {
                            document.getElementById('alertMsg403').style.display = 'none';
                        }, 3000);
                    }
                })
            })    
        } catch (e){
            console.log(e);
            console.log('-----------------------');
        }
        return false;

    }
}

var getFilms = () => {

    try{
        fetch("http://localhost:8080/api/v1/films",{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
            .then(result => {
                if(result.length > 0){
                    // creating a Div
                    var table = document.createElement("TABLE");
                    table.setAttribute("class","content-table");
                    table.border = "1";

                    //Adding the header row.
                    var row = table.insertRow(-1);
                    var headerCell1 = document.createElement("TH");
                    var headerCell2 = document.createElement("TH");
                    headerCell1.innerHTML = "Movie Name";
                    headerCell2.innerHTML = "Rating out of 5";
                    row.appendChild(headerCell1);
                    row.appendChild(headerCell2);

                    result.forEach(data => {
                        row = table.insertRow(-1);
                        var cell1 = row.insertCell(-1);
                        var cell2 = row.insertCell(-1);
                        cell1.innerHTML = data.name;
                        cell2.innerHTML = data.rating;
                    });

                    var dvTable = document.getElementById("dvTable");
                    dvTable.innerHTML = "";
                    dvTable.appendChild(table);

                } else {
                    alert("No Movies to Show")
                }
            });
    } catch (e) {
        console.log(e);
        console.log('-------------------------');
    }
    return false;

}

return{
    authLogin,
    createFilm,
    getFilms
}
})();