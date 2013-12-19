/* Aquí va el script para generar la visualización. */
	function jsFunction(){
	  	var myselect = document.getElementById("selectOpt");
	  	a=myselect.options[myselect.selectedIndex].value;
		val=null;
		if(a==1){
			val="<http://www.w3.org/2000/01/rdf-schema#Doctorado> ;";
			$('#total span').text('Funcionarios con Doctorado');
		}
		else if(a==2){
			val="<http://www.w3.org/2000/01/rdf-schema#Magister> ;";
			$('#total span').text('Funcionarios con Magister');
		}
		else if(a==3){
			val="<http://www.w3.org/2000/01/rdf-schema#Post-Titulo> ;";
			$('#total span').text('Funcionarios con Post-Titulo');
		}
		else if(a==4){
			val="<http://www.w3.org/2000/01/rdf-schema#TituloProfesional> ;";
			$('#total span').text('Funcionarios con Titulo Profesional');
		}
		else if(a==5){
			val="<http://www.w3.org/2000/01/rdf-schema#EspecializacionOdontologica> ;";
			$('#total span').text('Funcionarios con Especializacion Odontologica');
		}		
		if(a!=6){
			document.getElementById("selectOpt2").selectedIndex = 3;
		  	$("#named-graph-list > tbody:last").children('tr:not(:first)').remove();
			sparql(
			    // Consulta
			    'PREFIX res: <http://www.w3.org/2000/01/rdf-schema#>'+
			    'PREFIX rf: <http://example.org/>'+
			    'SELECT DISTINCT ?s ?p ?h ?b ?t ' +
			    'WHERE { GRAPH <http://verdata.cl/graphs/grafoUtalcaTransparente2013DEF> { '+
			    '?s <http://example.org/horas> ?h ;'+
			    'rf:grado '+val+
			    '<http://www.w3.org/2000/01/rdf-schema#tipoTrabajo> ?t ;'+
			    '<http://example.org/sueldoLiquido> ?p ;'+
			    '<http://example.org/sueldoBruto> ?b .'+
			    '} } order by ?s ',
			    // Acción
			    function(data) {
				a=[];
				$.each(data.results.bindings, function(index, value) {
					if (a.indexOf(value.s.value)==-1){
						a[a.length]=value.s.value;
				    $('table#named-graph-list').append(
					$('<tr>')
					    .append($('<td>').text(value.s.value))
					    .append($('<td>').text(value.t.value.split('#')[1].replace("_", " ")))
					    .append($('<td>').text("$"+value.b.value.split('#')[1].replace("$", "")))
					    .append($('<td>').text("$"+value.p.value.split('#')[1].replace("$", "")))
					    .append($('<td>').text(value.h.value.split('#')[1].replace("$", "")))
				    );					
					}

					// $('#total').append($('<span>').text(value.total.value));

				    // dentro del each
				});
				//fuera del each
			    });
		}
		else{
			document.getElementById("selectOpt2").selectedIndex = 3;
			$('#total span').text('Todos');
		  	$("#named-graph-list > tbody:last").children('tr:not(:first)').remove();
			sparql(
			    // Consulta
			    'PREFIX res: <http://www.w3.org/2000/01/rdf-schema#>'+
			    'PREFIX rf: <http://example.org/>'+
			    'SELECT DISTINCT ?s ?p ?h ?b ?t ' +
			    'WHERE { GRAPH <http://verdata.cl/graphs/grafoUtalcaTransparente2013DEF> { '+
			    '?s <http://example.org/horas> ?h ;'+
			    '<http://www.w3.org/2000/01/rdf-schema#tipoTrabajo> ?t ;'+
			    '<http://example.org/sueldoLiquido> ?p ;'+
			    '<http://example.org/sueldoBruto> ?b .'+
			    '} } order by ?s ',
			    // Acción
			    function(data) {
				a=[];
				$.each(data.results.bindings, function(index, value) {
					if (a.indexOf(value.s.value)==-1){
						a[a.length]=value.s.value;
				    $('table#named-graph-list').append(
					$('<tr>')
					    .append($('<td>').text(value.s.value))
					    .append($('<td>').text(value.t.value.split('#')[1].replace("_", " ")))
					    .append($('<td>').text("$"+value.b.value.split('#')[1].replace("$", "")))
					    .append($('<td>').text("$"+value.p.value.split('#')[1].replace("$", "")))
					    .append($('<td>').text(value.h.value.split('#')[1].replace("$", "")))
				    );					
					}

					// $('#total').append($('<span>').text(value.total.value));

				    // dentro del each
				});
				//fuera del each
			    });
		}
	}
		sparql(
		    // Consulta
		    'PREFIX res: <http://www.w3.org/2000/01/rdf-schema#>'+
		    'PREFIX rf: <http://example.org/>'+
		    'SELECT distinct ?s ?p ?h ?b ?t ' +
		    'WHERE { GRAPH <http://verdata.cl/graphs/grafoUtalcaTransparente2013DEF> { '+
		    '?s <http://example.org/horas> ?h .'+
		    '?s rf:grado <http://www.w3.org/2000/01/rdf-schema#Doctorado> .'+
		    '?s <http://www.w3.org/2000/01/rdf-schema#tipoTrabajo> ?t .'+
		    '?s <http://example.org/sueldoLiquido> ?p .'+
		    '?s <http://example.org/sueldoBruto> ?b } } ORDER BY ?s ',
		    // Acción
		    function(data) {
			a=[];
			document.getElementById("selectOpt2").selectedIndex = 3;
			$.each(data.results.bindings, function(index, value) {
				if (a.indexOf(value.s.value)==-1){
					a[a.length]=value.s.value;
			    $('table#named-graph-list').append(
				$('<tr>')
				    .append($('<td>').text(value.s.value))
				    .append($('<td>').text(value.t.value.split('#')[1].replace("_", " ")))
				    .append($('<td>').text("$"+value.b.value.split('#')[1].replace("$", "")))
				    .append($('<td>').text("$"+value.p.value.split('#')[1].replace("$", "")))
				    .append($('<td>').text(value.h.value.split('#')[1].replace("$", "")))
			    );					
				}

				// $('#total').append($('<span>').text(value.total.value));

			    // dentro del each
			});
			//fuera del each
		    });



function jsFunctionRango(){
	var myselect = document.getElementById("selectOpt2");
	  	a=myselect.options[myselect.selectedIndex].value;
		val=null;
		if(a==1){
			val="<http://www.w3.org/2000/01/rdf-schema#directivo> .";
			$('#total span').text('Funcionarios Directores');
		}
		else if(a==2){
			val="<http://www.w3.org/2000/01/rdf-schema#contrata_Academico> .";
			$('#total span').text('Funcionarios Academicos contratados');
		}
		else if(a==3){
			val="<http://www.w3.org/2000/01/rdf-schema#planta_Academico> .";
			$('#total span').text('Funcionarios Academicos de Planta');
		}
		if(a!=6){
			document.getElementById("selectOpt").selectedIndex = 5;
		  	$("#named-graph-list > tbody:last").children('tr:not(:first)').remove();
			sparql(
			    // Consulta
			    'PREFIX res: <http://www.w3.org/2000/01/rdf-schema#>'+
			    'PREFIX rf: <http://example.org/>'+
			    'SELECT distinct ?s ?p ?h ?b ?t ' +
			    'WHERE { GRAPH <http://verdata.cl/graphs/grafoUtalcaTransparente2013DEF> { '+
			    '?s <http://example.org/horas> ?h .'+
			    '?s res:tipoTrabajo '+val+
			    '?s <http://www.w3.org/2000/01/rdf-schema#tipoTrabajo> ?t .'+
			    '?s <http://example.org/sueldoLiquido> ?p .'+
			    '?s <http://example.org/sueldoBruto> ?b } } order by ?s',
			    // Acción
			    function(data) {
				a=[];
				$.each(data.results.bindings, function(index, value) {
					if (a.indexOf(value.s.value)==-1){
						a[a.length]=value.s.value;
				    $('table#named-graph-list').append(
					$('<tr>')
					    .append($('<td>').text(value.s.value))
					    .append($('<td>').text(value.t.value.split('#')[1].replace("_", " ")))
					    .append($('<td>').text("$"+value.b.value.split('#')[1].replace("$", "")))
					    .append($('<td>').text("$"+value.p.value.split('#')[1].replace("$", "")))
					    .append($('<td>').text(value.h.value.split('#')[1].replace("$", "")))
				    );					
					}

					// $('#total').append($('<span>').text(value.total.value));

				    // dentro del each
				});
				//fuera del each
			    });
			}
		else{
			document.getElementById("selectOpt").selectedIndex = 5;
			$('#total span').text('Todos');
		  	$("#named-graph-list > tbody:last").children('tr:not(:first)').remove();
			sparql(
			    // Consulta
			    'PREFIX res: <http://www.w3.org/2000/01/rdf-schema#>'+
			    'PREFIX rf: <http://example.org/>'+
			    'SELECT DISTINCT ?s ?p ?h ?b ?t ' +
			    'WHERE { GRAPH <http://verdata.cl/graphs/grafoUtalcaTransparente2013DEF> { '+
			    '?s <http://example.org/horas> ?h ;'+
			    '<http://www.w3.org/2000/01/rdf-schema#tipoTrabajo> ?t ;'+
			    '<http://example.org/sueldoLiquido> ?p ;'+
			    '<http://example.org/sueldoBruto> ?b .'+
			    '} } order by ?s ',
			    // Acción
			    function(data) {
				a=[];
				$.each(data.results.bindings, function(index, value) {
					if (a.indexOf(value.s.value)==-1){
						a[a.length]=value.s.value;
				    $('table#named-graph-list').append(
					$('<tr>')
					    .append($('<td>').text(value.s.value))
					    .append($('<td>').text(value.t.value.split('#')[1].replace("_", " ")))
					    .append($('<td>').text("$"+value.b.value.split('#')[1].replace("$", "")))
					    .append($('<td>').text("$"+value.p.value.split('#')[1].replace("$", "")))
					    .append($('<td>').text(value.h.value.split('#')[1].replace("$", "")))
				    );					
					}

					// $('#total').append($('<span>').text(value.total.value));

				    // dentro del each
				});
				//fuera del each
			    });
		}			
}
