$(document).ready(function() {

      function deleteNew(e) {
          e.preventDefault();

          if (confirm('¿Estas seguro de borrar este elemento?')) {
              $.ajax({
                  type: 'DELETE',
                  url: '/news/' + $(this).attr('rel')
              }).done(function( response ) {
                  if (response.msg != 'Ok') {
                      alert('Error interno: ' + response.msg);
                  }
                  createTable();
              });
          } else {
              return false;
          }
      };


      createTable();
      function createTable() {
          //alert("ECHO");
          var table = '';

          $.getJSON('/news', function(dataIn) {

              table = '<table class="table table-striped"> \
                                    <tbody>';

              $.each(dataIn, function() {
                  //alert('data:'+JSON.stringify(this));
                  var news_title = null
                  if (this.data.story_title != null)
                      news_title = this.data.story_title
                  else if (this.data.title != null)
                      news_title = this.data.title

                  var news_url = null
                  if (this.data.story_url != null)
                      news_url = this.data.story_url
                  else if (this.data.url != null)
                      news_url = this.data.url
                    //<div class="row" href="' + news_url + '">'
                  if (news_title != null) {
                      table = table +'<tr >';
                      table = table + '<td style="cursor:pointer" ><a href="'+news_url+'">' + news_title + '</a></td><td>' + this.data.author + '</td>';
                      table = table + '<td>' + formatDate(this.data.created_at) + '</td><td style="cursor:pointer" > <a class="deleteNews" rel="' + this.id + '"><img src="delete.png" width="25px" height="25px"/></a></td>';
                      table = table + '</tr>';
                  }
              });

              $('#contentNews').html(table);
              $('#contentNews table tbody').on('click', 'td a.deleteNews', deleteNew);
          });
      };



      function formatDate(fecha)
      {
          var dateFormat = new Date(fecha);

          var auxDay = parseInt(dateFormat.getDate());
          var auxMonth = parseInt(dateFormat.getMonth()+1 );
          var day = '';
          var month = '';
          if (auxDay < 10)
              day = '0' + auxDay;
          else
              day = '' + auxDay;

          if (auxMonth < 10)
              month = '0' + auxMonth;
          else
              month = '' + auxMonth;

          fecha = dateFormat.getFullYear() + '-' + month + '-' + day;
          lastDate = fecha;
          return fecha;
      }



});
