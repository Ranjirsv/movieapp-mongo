var movieObj;
function getMovie(){
 console.log('enterrrrrr');
 console.log(document.getElementById('movie').value);
 $.ajax({
        url:'/search',
        type:'GET',
        data:{name:document.getElementById('movie').value},
        error:function(){
            $('#result').html('<p>Error occured</p>');
        },
        success:function(data){
            console.log('successsss');
            var result_data=$.parseJSON(data);
            console.log(result_data);
            var length=result_data.total_results;
            var tableHtml='';
            tableHtml+='<tr>';
            tableHtml+='<th>Title</th>';
            tableHtml+='<th>Poster</th>';
            tableHtml+='<th>Release Date</th>';
            tableHtml+='<th>Action</th>';
            for(var i=0;i<length;i++){
                
                let posterPath='http://image.tmdb.org/t/p/w185/'+result_data.results[i].poster_path;
                console.log(result_data.results[i].title);
                var newObj={Title:result_data.results[i].title,Poster:posterPath,Release_Date:result_data.results[i].release_date};
                movieObj=JSON.stringify(newObj);
               var parseobj=JSON.parse(movieObj);
                tableHtml+='<tr>';
                tableHtml+='<td>'+result_data.results[i].title+'</td>';
                tableHtml+='<td><img src='+posterPath+'></td>';
                tableHtml+='<td>'+result_data.results[i].release_date+'</td>';
                tableHtml+="<td><button onclick='addFavourite(event)'  class='btn btn-success' id='addbtn' value='"+ movieObj +"'>Add</button></td></tr>";
                tableHtml+='</tr>';
            }
            
            $('#result tbody').html(tableHtml);
            console.log(movieObj);
        }
    
    });   
}

function addFavourite(event){
     $.ajax({
        url : '/addFav',
        type : 'POST',
        data : (JSON.parse(event.target.value)),
        error: function(err) {
                  alert("Error");
                },
               success: function(data) {
                     if(data.code === 11000){
                         alert("movie already added to the list");
                     }
                     else
                     {
                         alert("movie added");
                     }
                }
    });
}

function favMovie(){
    console.log('inside fav movieee');
    $.ajax({
        url : '/viewFav',
        type : 'GET',
        success : function(data){
            var viewHTML = '';
            viewHTML+='<tr><td>Title</td><td>Poster</td><td>Release_Date</td><td>Action</td></tr>';
            for(var i in data){
                var delValue=data[i].Title;
                viewHTML += 'tr';
                viewHTML += '<td>'+data[i].Title+'</td>';
                viewHTML += '<td><img src='+data[i].Poster+'></td>';
                viewHTML += '<td>'+data[i].Release_Date+'</td>';
                viewHTML += '<td><button type="button" class="btn btn-warning" value='+delValue+' onclick="deleteMovie(event)">Delete</button></td>';
                viewHTML += '</tr>';
                
            }
            $('#result').html(viewHTML);
        }
    });
}

function deleteMovie(event){
    console.log(event.target.value);
     $.ajax({
        url : '/deleteFav',
        type : 'POST',
        data : (JSON.parse(event.target.value)),
        error: function(err) {
                  alert("Error");
                },
        success: function(data) {
                    alert('movie deleted'+event.target.value);
                }
    });
}