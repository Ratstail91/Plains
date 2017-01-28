window.onload = function() {
  questTable = document.getElementById("questTable");
  //debugging
  var lorem = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adipiscing', 'elit.', 'Sed', 'at', 'ante.', 'Mauris', 'eleifend,', 'quam', 'a', 'vulputate', 'dictum,', 'massa', 'quam', 'dapibus', 'leo,', 'eget', 'vulputate', 'orci', 'purus', 'ut', 'lorem.', 'In', 'fringilla', 'mi', 'in', 'ligula.', 'Pellentesque', 'aliquam', 'quam', 'vel', 'dolor.', 'Nunc', 'adipiscing.', 'Sed', 'quam', 'odio,', 'tempus', 'ac,', 'aliquam', 'molestie,', 'varius', 'ac,', 'tellus.', 'Vestibulum', 'ut', 'nulla', 'aliquam', 'risus', 'rutrum', 'interdum.', 'Pellentesque', 'lorem.', 'Curabitur', 'sit', 'amet', 'erat', 'quis', 'risus', 'feugiat', 'viverra.', 'Pellentesque', 'augue', 'justo,', 'sagittis', 'et,', 'lacinia', 'at,', 'venenatis', 'non,', 'arcu.', 'Nunc', 'nec', 'libero.', 'In', 'cursus', 'dictum', 'risus.', 'Etiam', 'tristique', 'nisl', 'a', 'nulla.', 'Ut', 'a', 'orci.', 'Curabitur', 'dolor', 'nunc,', 'egestas', 'at,', 'accumsan', 'at,', 'malesuada', 'nec,', 'magna.',

'Nulla', 'facilisi.', 'Nunc', 'volutpat.', 'Vestibulum', 'ante', 'ipsum', 'primis', 'in', 'faucibus', 'orci', 'luctus', 'et', 'ultrices', 'posuere', 'cubilia', 'Curae;', 'Ut', 'sit', 'amet', 'orci', 'vel', 'mauris', 'blandit', 'vehicula.', 'Nullam', 'quis', 'enim.', 'Integer', 'dignissim', 'viverra', 'velit.', 'Curabitur', 'in', 'odio.', 'In', 'hac', 'habitasse', 'platea', 'dictumst.', 'Ut', 'consequat,', 'tellus', 'eu', 'volutpat', 'varius,', 'justo', 'orci', 'elementum', 'dolor,', 'sed', 'imperdiet', 'nulla', 'tellus', 'ut', 'diam.', 'Vestibulum', 'ipsum', 'ante,', 'malesuada', 'quis,', 'tempus', 'ac,', 'placerat', 'sit', 'amet,', 'elit.',

'Sed', 'eget', 'turpis', 'a', 'pede', 'tempor', 'malesuada.', 'Vivamus', 'quis', 'mi', 'at', 'leo', 'pulvinar', 'hendrerit.', 'Cum', 'sociis', 'natoque', 'penatibus', 'et', 'magnis', 'dis', 'parturient', 'montes,', 'nascetur', 'ridiculus', 'mus.', 'Pellentesque', 'aliquet', 'lacus', 'vitae', 'pede.', 'Nullam', 'mollis', 'dolor', 'ac', 'nisi.', 'Phasellus', 'sit', 'amet', 'urna.', 'Praesent', 'pellentesque', 'sapien', 'sed', 'lacus.', 'Donec', 'lacinia', 'odio', 'in', 'odio.', 'In', 'sit', 'amet', 'elit.', 'Maecenas', 'gravida', 'interdum', 'urna.', 'Integer', 'pretium,', 'arcu', 'vitae', 'imperdiet', 'facilisis,', 'elit', 'tellus', 'tempor', 'nisi,', 'vel', 'feugiat', 'ante', 'velit', 'sit', 'amet', 'mauris.', 'Vivamus', 'arcu.', 'Integer', 'pharetra', 'magna', 'ac', 'lacus.', 'Aliquam', 'vitae', 'sapien', 'in', 'nibh', 'vehicula', 'auctor.', 'Suspendisse', 'leo', 'mauris,', 'pulvinar', 'sed,', 'tempor', 'et,', 'consequat', 'ac,', 'lacus.', 'Proin', 'velit.', 'Nulla', 'semper', 'lobortis', 'mauris.', 'Duis', 'urna', 'erat,', 'ornare', 'et,', 'imperdiet', 'eu,', 'suscipit', 'sit', 'amet,', 'massa.', 'Nulla', 'nulla', 'nisi,', 'pellentesque', 'at,', 'egestas', 'quis,', 'fringilla', 'eu,', 'diam.',

'Donec', 'semper,', 'sem', 'nec', 'tristique', 'tempus,', 'justo', 'neque', 'commodo', 'nisl,', 'ut', 'gravida', 'sem', 'tellus', 'suscipit', 'nunc.', 'Aliquam', 'erat', 'volutpat.', 'Ut', 'tincidunt', 'pretium', 'elit.', 'Aliquam', 'pulvinar.', 'Nulla', 'cursus.', 'Suspendisse', 'potenti.', 'Etiam', 'condimentum', 'hendrerit', 'felis.', 'Duis', 'iaculis', 'aliquam', 'enim.', 'Donec', 'dignissim', 'augue', 'vitae', 'orci.', 'Curabitur', 'luctus', 'felis', 'a', 'metus.', 'Cum', 'sociis', 'natoque', 'penatibus', 'et', 'magnis', 'dis', 'parturient', 'montes,', 'nascetur', 'ridiculus', 'mus.', 'In', 'varius', 'neque', 'at', 'enim.', 'Suspendisse', 'massa', 'nulla,', 'viverra', 'in,', 'bibendum', 'vitae,', 'tempor', 'quis,', 'lorem.',

'Donec', 'dapibus', 'orci', 'sit', 'amet', 'elit.', 'Maecenas', 'rutrum', 'ultrices', 'lectus.', 'Aliquam', 'suscipit,', 'lacus', 'a', 'iaculis', 'adipiscing,', 'eros', 'orci', 'pellentesque', 'nisl,', 'non', 'pharetra', 'dolor', 'urna', 'nec', 'dolor.', 'Integer', 'cursus', 'dolor', 'vel', 'magna.', 'Integer', 'ultrices', 'feugiat', 'sem.', 'Proin', 'nec', 'nibh.', 'Duis', 'eu', 'dui', 'quis', 'nunc', 'sagittis', 'lobortis.', 'Fusce', 'pharetra,', 'enim', 'ut', 'sodales', 'luctus,', 'lectus', 'arcu', 'rhoncus', 'purus,', 'in', 'fringilla', 'augue', 'elit', 'vel', 'lacus.', 'In', 'hac', 'habitasse', 'platea', 'dictumst.', 'Aliquam', 'erat', 'volutpat.', 'Fusce', 'iaculis', 'elit', 'id', 'tellus.', 'Ut', 'accumsan', 'malesuada', 'turpis.', 'Suspendisse', 'potenti.', 'Vestibulum', 'lacus', 'augue,', 'lobortis', 'mattis,', 'laoreet', 'in,', 'varius', 'at,', 'nisi.', 'Nunc', 'gravida.', 'Phasellus', 'faucibus.', 'In', 'hac', 'habitasse', 'platea', 'dictumst.', 'Integer', 'tempor', 'lacus', 'eget', 'lectus.', 'Praesent', 'fringilla', 'augue', 'fringilla', 'dui.'];

  //actually build the table
  var header = "<thead><tr>";
  for (var i = 0; i < 5; i++) {
    var header = header + "<th>" + lorem[i] + "</th>";
  }
  header = header + "</tr></thead>";

  var body = "<tbody>";
  for (var i = 1; i < 15; i++) {
    body = body + "<tr>";
    for (var j = 0; j < 5; j++) {
      body = body + "<td>" + lorem[i*5 + j] + "</td>";
    }
    body = body + "</tr>";
  }
  body = body + "</tbody>";

  //finally
  questTable.innerHTML = header + body;
}
