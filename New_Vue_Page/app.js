

var customTitleStyle = null;
var customContentStyle = null;

var dateRef = new Date().toDateString();

//var d = new Date(dateRef);
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//alert(dayNames[d.getDate()]);//d.getFullYear()//monthNames[d.getMonth()]


console.log(dateRef);
Vue.component('editable-title',{
  template:'<div contenteditable="true" @input="updateLocalTitle"></div>',
  props:['content'],
  mounted:function(){
    this.$el.innerText = this.content;
  },  	 
  methods:{	    
  updateLocalTitle:function(event){
	app.updateTitle(this.$el.innerText);
    }
}
})



Vue.component('editable-content',{
  template:'<div contenteditable="true" @input="updateLocalContent"></div>',
  props:['content'],
  mounted:function(){
    this.$el.innerText = this.content;
  },  	 
  methods:{	    
  updateLocalContent:function(event){
    // this.$emit('update',event.target.innerText);
	app.updateContent(this.$el.innerText);
    }
}
})


var app = new Vue({
  el: '#app',
  data() {
    return {
    title:null,
	content:'content',
	post:null,
	entries:[]
    }},
	created (){
		console.log('created')
		this.loadPaper();
		
		auto = null;
	},
  	methods:{
  		updateTitle: function (txt){
  			this.title = txt;
  		},
  		updateContent: function (txt){
  			this.content = txt;
  		},
		loadPaper: function(){
			
		let vm = this;
			var saved_data =axios.get('./saved_data/data.json')
			.then(function (response){
			//	console.log(response.data);
				vm.entries = response.data;
				var responseData = response.data[dateRef];
				vm.$data.title = responseData.title;
				vm.$data.content = responseData.content;
				vm.post = true;
			})
			.catch(function (error){
			console.log('error '+error);
			});

		},
		savePaper: function(){
			
			let vm = this;

			var saved_data = [];
			axios.get('./saved_data/data.json')
			.then(function (response){

				response.data[dateRef] = vm.$data;
				response.data[dateRef].entries = [];
				saved_data.push(JSON.stringify(response.data, null, '\t'))
			})
				.then(function (){

		
				$.ajax({
				url:"./saved_data/save.php", //the page containing php script
				type: "POST", //request type
				data : {'ref':	saved_data,
				'auto':auto},
				success:function(result){
				alert(result);
		}
  }); 
    	});
  
		}
	}
});

function openNav() {
    document.getElementById("mySidenav").style.width = "150px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


    var treeData = [
      {
        text: 'Menu 1rsths',
        href: '#menu1',
        nodes: [
          {
            text: 'Sub Menu 1',
            href: '#submenu1',
            nodes: [
              {
                text: 'Sub Menu 1.1',
                href: '#submenu1.1'
              },
              {
                text: 'Sub Menu 1.2',
                href: '#submenu1.2'
              }
            ]
          },
          {
            text: 'Sub Menu 2',
            href: '#submenu2',
            nodes: [
              {
                text: 'Sub Menu 2.1',
                href: '#submenu2.1',
                tags: ['0']
              },
              {
                text: 'Sub Menu 2.2',
                href: '#submenu2.2',
                tags: ['0']
              }
            ]
          },
        ]
      }
    ];

var testData = app.$data;
console.log('testData: '+testData);
var keys = Object.keys(testData);
for(var i=0;i<keys.length;i++){
    var key = keys[i];
    console.log(key, testData[key]);
}

//testData[0] = {text:'some'};
    $('#treeview').treeview({

      data: testData,
    });
