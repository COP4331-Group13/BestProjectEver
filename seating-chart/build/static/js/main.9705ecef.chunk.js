(this["webpackJsonpseating-chart"]=this["webpackJsonpseating-chart"]||[]).push([[0],{18:function(e,t,a){},35:function(e,t,a){e.exports=a(52)},52:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(31),i=a.n(r),l=a(34),u=a(13),o=Object(u.a)(),c=a(14),d=a(15),m=a(2),h=a(4),p=a(6),g=a(8),v=a(7),b=a(9),E=(a(18),function e(t){Object(h.a)(this,e),this.userName=t}),f=function(e){function t(e,a,n,s,r,i){var l;return Object(h.a)(this,t),(l=Object(g.a)(this,Object(v.a)(t).call(this,e))).name=a,l.address=n,l.phoneNumber=s,l.guestId=r,l.eventPin=i,l}return Object(b.a)(t,e),t}(E),y=function e(t,a,n,s,r){Object(h.a)(this,e),this.name=t,this.pin=a,this.address=n,this.eventDate=s,this.maxPeople=r},x=a(40);function O(e){var t=new XMLHttpRequest;return t.open("POST","http://35.243.169.229:5000/api/login",!1),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("email="+e.user+"&password="+e.pass),t.status}function N(e,t){if(""!==e.gID&&10===e.gID.length){var a=function(e){var t=new XMLHttpRequest;return t.open("POST","http://35.243.169.229:5000/api/guest-login",!1),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("guest_pin="+e),[t.status,t.responseText]}(e.gID);if(200===a[0]){var n=JSON.parse(a[1]),s=new f(n.results[0].email,n.results[0].full_name,n.results[0].address,n.results[0].phone_number,n.results[0].guest_pin,n.results[0].event_pin);return t.setUser(s),[!0]}return 205===a[0]?[!1,"Invalid Guest ID"]:[!1,"Error has occured"]}return[!1,"Invalid Guest ID"]}function j(e,t){if(e.pass!==e.repass)return[!1,"Passwords do not match"];if(e.user.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/)){if(e.pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)){if(""!==e.name&&""!==e.user&&""!==e.pass&&""!==e.repass){var a=O(e);if(200===a||204===a)return[!1,"An account already exists for ".concat(e.user)];if(205===a){if(200===function(e){var t=new XMLHttpRequest;return t.open("POST","http://35.243.169.229:5000/api/register",!1),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("full_name="+e.name+"&email="+e.user+"&password="+e.pass),t.status}(e)){var n=new E(e.user);return t.setUser(n),[!0]}return[!1,"Error has occurred"]}return[!1,"Error has occurred"]}return[!1,"Please fill in all fields"]}return[!1,"Passwords must be at least 8 characters long; contain at least 1 lower case letter [a-z]; at least 1 upper case letter [A-Z]; at least 1 number [0-9]"]}return[!1,"".concat(e.user," is not a valid email address")]}function w(e,t){var a=t+x("Aa0",5);return 200===function(e,t,a){var n=new XMLHttpRequest;return n.open("POST","http://35.243.169.229:5000/api/add-guest",!1),n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.send("full_name="+e.name+"&email="+e.email+"&address="+e.address+"&phone_number="+e.phone+"&event_pin="+t+"&guest_pin="+a),n.status}(e,t,a)?[!0,new f(e.email,e.name,e.address,e.phone,a,t)]:[!1,"Error has occurred"]}function S(e){return 200===function(e){var t=new XMLHttpRequest;return t.open("POST","http://35.243.169.229:5000/api/delete-guest",!1),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("guest_pin="+e),t.status}(e)?[!0]:[!1,"Error has occurred"]}function k(e,t){return 200===function(e,t){var a=new XMLHttpRequest;return a.open("POST","http://35.243.169.229:5000/api/update-guest",!1),a.setRequestHeader("Content-type","application/x-www-form-urlencoded"),a.send("full_name="+e.name+"&email="+e.email+"&phone_number="+e.phone+"&address="+e.address+"&guest_pin="+t),a.status}(e,t)?[!0]:[!1,"Error has occurred"]}function D(e){var t=function(e){var t=new XMLHttpRequest;return t.open("POST","http://35.243.169.229:5000/api/get-guest-list",!1),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("event_pin="+e),[t.status,t.responseText]}(e);if(200===t[0]){for(var a=JSON.parse(t[1]),n=[],s=0;s<a.length;s++)n.push(new f(a.results[s].email,a.results[s].full_name,a.results[s].address,a.results[s].phone_number,a.results[s].guest_pin,a.results[s].event_pin));return[!0,n]}return[!1,"Error has occurred"]}function I(e,t){var a=x("Aa0",5);return 200===function(e,t,a){var n=new XMLHttpRequest;return n.open("POST","http://35.243.169.229:5000/api/add-event",!1),n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.send("planner="+t+"&pin="+a+"&event_name="+e.name+"&event_time="+e.date+"&address="+e.address+"&max_people="+e.max),n.status}(e,t,a)?[!0,new y(e.name,a,e.address,e.date,e.max)]:[!1,"Error has occurred"]}function L(e){var t=function(e){var t=new XMLHttpRequest;return t.open("POST","http://35.243.169.229:5000/api/get-event",!1),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("event_pin="+e),[t.status,t.responseText]}(e);if(200===t[0]){var a=JSON.parse(t[1]);return[!0,new y(a.results[0].event_name,a.results[0].event_pin,a.results[0].address,a.results[0].event_time,a.results[0].max_people)]}return[!1,"Error has occurred"]}function G(e){var t=function(e){var t=new XMLHttpRequest;return t.open("POST","http://35.243.169.229:5000/api/get-event-list",!1),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("planner="+e),[t.status,t.responseText]}(e.userName);if(200===t[0]){for(var a=JSON.parse(t[1]),n=[],s=0;s<a.length;s++)n.push(new y(a.results[s].event_name,a.results[s].event_pin,a.results[s].address,a.results[s].event_time,a.results[s].max_people));return[!0,n]}return[!1,"Error has occurred"]}function C(e){var t=function(e){var t=new XMLHttpRequest;return t.open("POST","http://35.243.169.229:5000/api/get-guest-group",!1),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("guest_pin="+e),[t.status,t.responseText]}(e);return 200===t[0]?[!0,JSON.parse(t[1]).group_name]:[!1]}var P=function(e){function t(){return Object(h.a)(this,t),Object(g.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"wrapperbox"},s.a.createElement("div",{id:"welcome"},s.a.createElement("h1",null,"Welcome to Best Fit Seating",s.a.createElement("br",null),"Are you here as an Event Planner or as a Guest?")),s.a.createElement("div",{id:"loginbox"},s.a.createElement(U,{history:this.props.history,storage:this.props.storage}),s.a.createElement(B,{history:this.props.history,storage:this.props.storage})))}}]),t}(s.a.Component),B=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={gID:"",error:"guestError"},a.changeGID=a.changeGID.bind(Object(m.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(m.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"changeGID",value:function(e){e.target.value.length>10?this.setState({gID:e.target.value.substr(0,10)}):this.setState({gID:e.target.value})}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=N(this.state,this.props.storage);t[0]?this.props.history.push("/guest"):(this.setState({error:"loginError"}),this.setState({errorMessage:t[1]}))}},{key:"render",value:function(){return s.a.createElement("div",{className:"box",id:"guestLogin"},s.a.createElement("h2",null,"Login as Guest"),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",{className:"infoBox"},s.a.createElement("input",{type:"text",className:"textBox",id:"guestID",placeholder:"Unique Guest ID",value:this.state.gID,onChange:this.changeGID}),s.a.createElement("div",{className:"loginError",id:this.state.error},this.state.errorMessage)),s.a.createElement("input",{type:"submit",className:"button",id:"guest",value:"CONTINUE"})))}}]),t}(s.a.Component),U=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={user:"",pass:"",error:"plannerError"},a.changeUser=a.changeUser.bind(Object(m.a)(a)),a.changePass=a.changePass.bind(Object(m.a)(a)),a.handleRegister=a.handleRegister.bind(Object(m.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(m.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"changeUser",value:function(e){this.setState({user:e.target.value})}},{key:"changePass",value:function(e){this.setState({pass:e.target.value})}},{key:"handleRegister",value:function(e){e.preventDefault(),this.props.history.push("/register")}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=function(e,t){if(""!==e.user&&""!==e.pass){var a=O(e);if(200===a){var n=new E(e.user);return t.setUser(n),[!0]}return 204===a||205===a?[!1,"Invalid email or password"]:[!1,"Error has occured"]}return[!1,"Please fill in all fields"]}(this.state,this.props.storage);t[0]?this.props.history.push("/events"):(this.setState({error:"loginError"}),this.setState({errorMessage:t[1]}))}},{key:"render",value:function(){return s.a.createElement("div",{className:"box",id:"plannerLogin"},s.a.createElement("h2",null,"Login as Planner"),s.a.createElement("form",{"data-testid":"plannerLoginForm",onSubmit:this.handleSubmit},s.a.createElement("div",{className:"infoBox"},s.a.createElement("input",{"data-testid":this.state.user,type:"text",className:"textBox",id:"email",required:!0,placeholder:"E-mail",value:this.state.user,onChange:this.changeUser}),s.a.createElement("input",{"data-testid":this.state.pass,type:"password",className:"textBox",id:"pass",required:!0,placeholder:"Password",value:this.state.pass,onChange:this.changePass}),s.a.createElement("div",{className:"loginError",id:this.state.error},this.state.errorMessage)),s.a.createElement("div",{id:"newRegister",onClick:this.handleRegister},"New User? Click Here to Register"),s.a.createElement("input",{type:"submit",className:"button",id:"planner",value:"LOGIN"})))}}]),t}(s.a.Component),A=Object(d.g)(P),_=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={name:"",user:"",pass:"",repass:"",error:"plannerError",errorMessage:"Invalid Registration"},a.changeName=a.changeName.bind(Object(m.a)(a)),a.changeUser=a.changeUser.bind(Object(m.a)(a)),a.changePass=a.changePass.bind(Object(m.a)(a)),a.changeRepass=a.changeRepass.bind(Object(m.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(m.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"changeName",value:function(e){this.setState({name:e.target.value})}},{key:"changeUser",value:function(e){this.setState({user:e.target.value})}},{key:"changePass",value:function(e){this.setState({pass:e.target.value})}},{key:"changeRepass",value:function(e){this.setState({repass:e.target.value})}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=j(this.state,this.props.storage);t[0]?this.props.history.push("/events"):(this.setState({error:"loginError"}),this.setState({errorMessage:t[1]})),console.log(t[0])}},{key:"render",value:function(){return s.a.createElement("div",{className:"userMain",id:"wrapperbox"},s.a.createElement("form",{id:"registerBox",onSubmit:this.handleSubmit},s.a.createElement("h1",{id:"registerTitle"},"Account Information"),s.a.createElement("div",{id:"inputs"},s.a.createElement("input",{type:"text",className:"textBox",id:"firstName",required:!0,placeholder:"Full Name",value:this.state.name,onChange:this.changeName}),s.a.createElement("input",{type:"text",className:"textBox",id:"e-mail",required:!0,placeholder:"E-mail Address",value:this.state.user,onChange:this.changeUser}),s.a.createElement("input",{type:"password",className:"textBox",id:"password",required:!0,placeholder:"Password",value:this.state.pass,onChange:this.changePass}),s.a.createElement("input",{type:"password",className:"textBox",id:"re_password",required:!0,placeholder:"Re-Enter Password",value:this.state.repass,onChange:this.changeRepass}),s.a.createElement("div",{className:"loginError",id:this.state.error},this.state.errorMessage)),s.a.createElement("input",{type:"submit",className:"button",id:"newUser",value:"Create Account"})))}}]),t}(s.a.Component),q=Object(d.g)(_),R=a(24),F=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).handleEventPage=a.handleEventPage.bind(Object(m.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"handleEventPage",value:function(e){e.preventDefault(),this.props.history.push(this.props.towhere)}},{key:"render",value:function(){return s.a.createElement("div",{className:"button",id:"navigation",onClick:this.handleEventPage},this.props.text)}}]),t}(s.a.Component),M=function(e){function t(e){var a;Object(h.a)(this,t);var n=(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).props.storage.getGuests();if(n[0]){a.state={guestList:n[1],listItems:[],clicked:"false",name:"",email:"",phone:"",address:"",search:"",curEvent:a.props.storage.getEvent()};for(var r=0;r<a.state.guestList.length;r++)a.state.listItems.push(s.a.createElement(T,{Key:a.state.guestList[r].guestId,Guest:a.state.guestList[r],guestName:a.state.guestList[r].name,guestEmail:a.state.guestList[r].userName,guestPhone:a.state.guestList[r].phoneNumber,guestAddress:a.state.guestList[r].address,guestId:a.state.guestList[r].guestId,storage:a.props.storage,history:a.props.history}))}else a.state={guestList:[],listItems:[],clicked:"false",name:"",email:"",phone:"",address:"",search:"",curEvent:a.props.storage.getEvent()};return a.props.storage.setGuest(void 0),a.openDialog=a.openDialog.bind(Object(m.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(m.a)(a)),a.closeDialog=a.closeDialog.bind(Object(m.a)(a)),a.changeName=a.changeName.bind(Object(m.a)(a)),a.changeEmail=a.changeEmail.bind(Object(m.a)(a)),a.changeAddress=a.changeAddress.bind(Object(m.a)(a)),a.changePhone=a.changePhone.bind(Object(m.a)(a)),a.changeSearch=a.changeSearch.bind(Object(m.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"openDialog",value:function(){document.getElementById("dialogbox").style.display="block"}},{key:"closeDialog",value:function(){document.getElementById("dialogbox").style.display="none"}},{key:"changeName",value:function(e){this.setState({name:e.target.value})}},{key:"changeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"changeAddress",value:function(e){this.setState({address:e.target.value})}},{key:"changePhone",value:function(e){this.setState({phone:e.target.value})}},{key:"changeSearch",value:function(e){this.setState({search:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a=this.props.storage.addGuest(this.state);if(a[0]){this.closeDialog(),alert("Guest was successfully added!");this.state.guestList.length;this.setState({guestList:this.props.storage.getGuests()}),this.setState((function(e){return{listItems:[].concat(Object(R.a)(e.listItems),[s.a.createElement(T,{Key:a[1].guestId,Guest:a[1],guestName:a[1].name,guestEmail:a[1].userName,guestPhone:a[1].phoneNumber,guestAddress:a[1].address,guestId:a[1].guestId,storage:t.props.storage,history:t.props.history})])}}))}else this.setState({error:"guestError"}),this.setState({errorMessage:a[1]})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{id:"wrapperbox"},s.a.createElement("div",{id:"welcome"},s.a.createElement(F,{history:this.props.history,towhere:"/events",text:"Events"}),s.a.createElement("h1",null,this.state.curEvent.name)),s.a.createElement("div",{id:"chartPlanner"},s.a.createElement("div",{id:"seatingChart"},s.a.createElement("h1",null,"seating chart here")),s.a.createElement("div",{id:"chartItems"},s.a.createElement("h1",null,"items here"))),s.a.createElement("div",{id:"sidebar"},s.a.createElement("div",{id:"search"},s.a.createElement("form",null,s.a.createElement("input",{type:"text",className:"textBox",id:"searchBox",placeholder:"Search...",onChange:this.changeSearch}))),s.a.createElement("div",{id:"list"},s.a.createElement("ul",{id:"guestList"},this.state.listItems)),s.a.createElement("div",{id:"add"},s.a.createElement("input",{type:"submit",className:"button",id:"add_guest",value:"Add Guest",onClick:function(){return e.openDialog()}})),s.a.createElement("div",{id:"properties"},s.a.createElement("p",null,s.a.createElement("label",null,"Item properties")),s.a.createElement("p",null,s.a.createElement("label",null,"Room properties")))),s.a.createElement("div",{id:"dialogbox"},s.a.createElement("dialog",{open:!0},s.a.createElement("div",{id:"closeWindow"},s.a.createElement("input",{type:"submit",className:"button2",id:"closeButton",value:"X",onClick:function(){return e.closeDialog()}})),s.a.createElement("h1",null,"Add a Guest"),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("input",{type:"text",className:"textBox",id:"name",placeholder:"Name",value:this.state.name,onChange:this.changeName,required:!0}),s.a.createElement("input",{type:"email",className:"textBox",id:"email",placeholder:"E-mail",value:this.state.email,onChange:this.changeEmail,required:!0}),s.a.createElement("input",{type:"text",className:"textBox",id:"phone",placeholder:"Phone Number",value:this.state.phone,onChange:this.changePhone,required:!0}),s.a.createElement("input",{type:"text",className:"textBox",id:"address",placeholder:"Address",value:this.state.address,onChange:this.changeAddress,required:!0}),s.a.createElement("div",{className:"eventError",id:this.state.error},this.state.errorMessage),s.a.createElement("div",{id:"buttonbox"},s.a.createElement("input",{type:"submit",className:"button",id:"add_guest",value:"Submit"}))))))}}]),t}(s.a.Component),T=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={name:a.props.guestName,email:a.props.guestEmail,phone:a.props.guestPhone,address:a.props.guestAddress},a.changeName=a.changeName.bind(Object(m.a)(a)),a.changeEmail=a.changeEmail.bind(Object(m.a)(a)),a.changeAddress=a.changeAddress.bind(Object(m.a)(a)),a.changePhone=a.changePhone.bind(Object(m.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(m.a)(a)),a.openDialog=a.openDialog.bind(Object(m.a)(a)),a.closeDialog=a.closeDialog.bind(Object(m.a)(a)),a.disableForm=a.disableForm.bind(Object(m.a)(a)),a.enableForm=a.enableForm.bind(Object(m.a)(a)),a.deleteForm=a.deleteForm.bind(Object(m.a)(a)),a.cancelForm=a.cancelForm.bind(Object(m.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"changeName",value:function(e){this.setState({name:e.target.value})}},{key:"changeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"changeAddress",value:function(e){this.setState({address:e.target.value})}},{key:"changePhone",value:function(e){this.setState({phone:e.target.value})}},{key:"openDialog",value:function(){this.props.storage.setGuest(this.props.Guest),document.getElementById(this.props.Key).style.display="block"}},{key:"closeDialog",value:function(){this.disableForm(),this.cancelForm(),this.props.storage.resetGuest(),document.getElementById(this.props.Key).style.display="none"}},{key:"deleteForm",value:function(){var e=this.props.storage.getGuest();!0===window.confirm("Are you sure you want to delete the guest: "+e.guestId+" ?")&&(this.props.storage.deleteGuest()?(alert("Guest deleted!"),this.closeDialog(),window.location.reload()):alert("Error deleting guest"))}},{key:"cancelForm",value:function(){this.disableForm(),this.setState({name:this.props.guestName}),this.setState({email:this.props.guestEmail}),this.setState({phone:this.props.guestPhone}),this.setState({address:this.props.guestAddress})}},{key:"disableForm",value:function(){for(var e=document.getElementsByClassName("textFormBox"),t=0;t<e.length;t++)e[t].disabled=!0}},{key:"enableForm",value:function(){for(var e=document.getElementsByClassName("textFormBox"),t=0;t<e.length;t++)e[t].disabled=!1}},{key:"handleSubmit",value:function(e){e.preventDefault();this.props.storage.getGuest();!0===window.confirm("Do you want to save changes?")&&(this.props.storage.updateGuest(this.state)&&(alert("Guest info updated!"),this.closeDialog(),window.location.reload()))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("div",{id:"guestListItem"},s.a.createElement("li",{key:this.props.Key,className:"guestItem",value:this.props.guestName},this.props.guestName),s.a.createElement("input",{type:"submit",id:"guestItemOpen",value:"+",onClick:function(){return e.openDialog()}})),s.a.createElement("div",{className:"dialogbox2",id:this.props.Key},s.a.createElement("dialog",{open:!0},s.a.createElement("div",{id:"closeWindow"},s.a.createElement("input",{type:"submit",className:"button2",id:"closeButton",value:"X",onClick:function(){return e.closeDialog()}})),s.a.createElement("div",{id:"guestBoxInfo"},s.a.createElement("h1",null,this.props.guestName),s.a.createElement("label",null,s.a.createElement("b",null,"Guest ID:")," ",this.props.guestId),s.a.createElement("form",{id:"formGuest",onSubmit:this.handleSubmit},s.a.createElement("p",null,s.a.createElement("label",null,"Name"),s.a.createElement("input",{type:"text",className:"textFormBox",value:this.state.name,onChange:this.changeName,disabled:!0})),s.a.createElement("p",null,s.a.createElement("label",null,"Email"),s.a.createElement("input",{type:"email",className:"textFormBox",value:this.state.email,onChange:this.changeEmail,disabled:!0})),s.a.createElement("p",null,s.a.createElement("label",null,"Phone"),s.a.createElement("input",{type:"text",className:"textFormBox",value:this.state.phone,onChange:this.changePhone,disabled:!0})),s.a.createElement("p",null,s.a.createElement("label",null,"Address"),s.a.createElement("input",{type:"text",className:"textFormBox",value:this.state.address,onChange:this.changeAddress,disabled:!0})),s.a.createElement("input",{type:"submit",className:"button",id:"guestButtons",value:"Save"})),s.a.createElement("input",{type:"submit",className:"button",id:"guestButtons",value:"Edit",onClick:function(){return e.enableForm()}}),s.a.createElement("input",{type:"submit",className:"button",id:"guestButtons",value:"Delete",onClick:function(){return e.deleteForm()}}),s.a.createElement("input",{type:"submit",className:"button",id:"guestButtons",value:"Cancel",onClick:function(){return e.cancelForm()}})),s.a.createElement("div",{id:"guestBoxPreferences"},s.a.createElement("h1",null,"Preferences")),s.a.createElement("div",{id:"guestBoxGroups"},s.a.createElement("h1",null,"Groups")))))}}]),t}(s.a.Component),H=(s.a.Component,Object(d.g)(M)),X=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).props.storage.getSingleEvent(),a.state={name:"",email:"",phone:"",address:"",curUser:a.props.storage.getUser(),curEvent:a.props.storage.getEvent(),curGroup:a.props.storage.getGuestGroup()},a.handleLogout=a.handleLogout.bind(Object(m.a)(a)),a.changeName=a.changeName.bind(Object(m.a)(a)),a.changeEmail=a.changeEmail.bind(Object(m.a)(a)),a.changeAddress=a.changeAddress.bind(Object(m.a)(a)),a.changePhone=a.changePhone.bind(Object(m.a)(a)),a.openDialog=a.openDialog.bind(Object(m.a)(a)),a.closeDialog=a.closeDialog.bind(Object(m.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(m.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"handleLogout",value:function(e){e.preventDefault(),this.props.storage.clear(),this.props.history.push("/")}},{key:"changeName",value:function(e){this.setState({name:e.target.value})}},{key:"changeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"changeAddress",value:function(e){this.setState({address:e.target.value})}},{key:"changePhone",value:function(e){this.setState({phone:e.target.value})}},{key:"openDialog",value:function(){this.setState({name:this.state.curUser.name,email:this.state.curUser.userName,phone:this.state.curUser.phoneNumber,address:this.state.curUser.address}),document.getElementById("edit_guest").style.display="block"}},{key:"closeDialog",value:function(){document.getElementById("edit_guest").style.display="none"}},{key:"handleSubmit",value:function(e){(e.preventDefault(),!0===window.confirm("Do you want to save changes?"))&&(this.props.storage.updateGuestUser(this.state)&&(alert("Account info updated!"),this.closeDialog(),window.location.reload(!0)))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{id:"wrapperbox"},s.a.createElement("div",{id:"welcome"},s.a.createElement("div",{className:"button",id:"logout",onClick:this.handleLogout},"Logout"),s.a.createElement("h1",null,"Welcome, ",this.state.curUser.name,"!")),s.a.createElement("div",{id:"chartGuest"},s.a.createElement("h1",null,"Pretend this is a seating chart...")),s.a.createElement("div",{id:"guestInfo"},s.a.createElement("div",{className:"box",id:"guestBox"},s.a.createElement("h3",null,"Account Information"),s.a.createElement("div",{id:"guestInformation"},s.a.createElement("p",null,s.a.createElement("b",null,"Guest ID: "),this.state.curUser.guestId,s.a.createElement("input",{type:"submit",className:"button2",id:"edit",value:"EDIT",onClick:function(){return e.openDialog()}})),s.a.createElement("p",null,s.a.createElement("b",null,"Name: "),this.state.curUser.name),s.a.createElement("p",null,s.a.createElement("b",null,"Email: "),this.state.curUser.userName),s.a.createElement("p",null,s.a.createElement("b",null,"Phone Number: "),this.state.curUser.phoneNumber),s.a.createElement("p",null,s.a.createElement("b",null,"Address: "),this.state.curUser.address))),s.a.createElement("div",{className:"box",id:"preferencesBox"},s.a.createElement("h3",null,"Preferences"),s.a.createElement("div",{id:"guestPreferences"},s.a.createElement("p",null," here goes guest preferences "))),s.a.createElement("div",{className:"box",id:"groupsBox"},s.a.createElement("h3",null,"Groups"),s.a.createElement("div",{id:"guestGroups"},s.a.createElement("p",null,s.a.createElement("b",null,"Your Event Group: "),this.state.curGroup[1]))),s.a.createElement("div",{className:"box",id:"eventBox"},s.a.createElement("h3",null,"Event Information"),s.a.createElement("div",{id:"eventInformation"},s.a.createElement("p",null,s.a.createElement("b",null,"Event Name: "),this.state.curEvent.name),s.a.createElement("p",null,s.a.createElement("b",null,"Event Address: "),this.state.curEvent.address),s.a.createElement("p",null,s.a.createElement("b",null,"Event Date/Time: "),this.state.curEvent.eventDate)))),s.a.createElement("div",{className:"dialogbox2",id:"edit_guest"},s.a.createElement("dialog",{open:!0},s.a.createElement("div",{id:"closeWindow"},s.a.createElement("input",{type:"submit",className:"button2",id:"closeButton",value:"X",onClick:function(){return e.closeDialog()}})),s.a.createElement("h1",null,"Edit Account Information:"),s.a.createElement("form",{id:"formGuest",onSubmit:this.handleSubmit},s.a.createElement("p",null,s.a.createElement("label",null,"Name"),s.a.createElement("input",{type:"text",className:"textFormBox",value:this.state.name,onChange:this.changeName})),s.a.createElement("p",null,s.a.createElement("label",null,"Email"),s.a.createElement("input",{type:"email",className:"textFormBox",value:this.state.email,onChange:this.changeEmail})),s.a.createElement("p",null,s.a.createElement("label",null,"Phone"),s.a.createElement("input",{type:"text",className:"textFormBox",value:this.state.phone,onChange:this.changePhone})),s.a.createElement("p",null,s.a.createElement("label",null,"Address"),s.a.createElement("input",{type:"text",className:"textFormBox",value:this.state.address,onChange:this.changeAddress})),s.a.createElement("input",{type:"submit",className:"button",id:"button",value:"Save"})))))}}]),t}(s.a.Component),W=Object(d.g)(X),K=function(e){function t(e){var a;Object(h.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).props.storage.resetGuests();var n=a.props.storage.getEvents();if(n[0]){a.state={eventList:n[1],listItems:[],name:"",date:"",address:"",max:""};for(var r=0;r<a.state.eventList.length;r++)a.state.listItems.push(s.a.createElement(J,{Key:a.state.eventList[r].pin,Event:a.state.eventList[r],eventName:a.state.eventList[r].name,storage:a.props.storage,history:a.props.history}))}else a.state={eventList:[],listItems:[],name:"",date:"",address:"",max:""};return a.props.storage.setEvent(void 0),a.handleSubmit=a.handleSubmit.bind(Object(m.a)(a)),a.handleLogout=a.handleLogout.bind(Object(m.a)(a)),a.openDialog=a.openDialog.bind(Object(m.a)(a)),a.closeDialog=a.closeDialog.bind(Object(m.a)(a)),a.changeName=a.changeName.bind(Object(m.a)(a)),a.changeDate=a.changeDate.bind(Object(m.a)(a)),a.changeAddress=a.changeAddress.bind(Object(m.a)(a)),a.changeMax=a.changeMax.bind(Object(m.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"openDialog",value:function(){document.getElementById("dialogbox").style.display="block"}},{key:"closeDialog",value:function(){document.getElementById("dialogbox").style.display="none"}},{key:"changeName",value:function(e){this.setState({name:e.target.value})}},{key:"changeDate",value:function(e){this.setState({date:e.target.value})}},{key:"changeAddress",value:function(e){this.setState({address:e.target.value})}},{key:"changeMax",value:function(e){this.setState({max:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a=this.props.storage.addEvent(this.state);if(a[0]){this.closeDialog();var n=this.state.eventList.length;this.setState({eventList:this.props.storage.getEvents()}),this.setState((function(e){return{listItems:[].concat(Object(R.a)(e.listItems),[s.a.createElement(J,{Key:n,Event:a[1],eventName:a[1].name,storage:t.props.storage,history:t.props.history})])}}))}else this.setState({error:"eventError"}),this.setState({errorMessage:a[1]})}},{key:"handleLogout",value:function(e){e.preventDefault(),this.props.storage.clear(),this.props.history.push("/")}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{id:"logoutBox"},s.a.createElement("div",{id:"wrapperbox"},s.a.createElement("div",{id:"welcome"},s.a.createElement("div",{className:"button",id:"logout",onClick:this.handleLogout},"Logout"),s.a.createElement("h1",null,"Welcome, ",this.props.storage.getUser().userName,"!")),s.a.createElement("div",{id:"listWrapper"},s.a.createElement("ul",{id:"eventList"},this.state.listItems),s.a.createElement("input",{type:"submit",className:"button",id:"add_event",value:"Add Event",onClick:function(){return e.openDialog()}})),s.a.createElement("div",{id:"dialogbox"},s.a.createElement("dialog",{open:!0},s.a.createElement("div",{id:"closeWindow"},s.a.createElement("input",{type:"submit",className:"button2",id:"closeButton",value:"X",onClick:function(){return e.closeDialog()}})),s.a.createElement("h1",null,"Add an Event"),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("input",{type:"text",className:"textBox",id:"name",placeholder:"Event Name",value:this.state.name,onChange:this.changeName,required:!0}),s.a.createElement("input",{type:"datetime-local",className:"textBox",id:"date",placeholder:"Date/Time",value:this.state.date,onChange:this.changeDate,required:!0}),s.a.createElement("input",{type:"text",className:"textBox",id:"address",placeholder:"Address",value:this.state.address,onChange:this.changeAddress,required:!0}),s.a.createElement("input",{type:"number",className:"textBox",id:"max",placeholder:"Max # of Guests",value:this.state.max,onChange:this.changeMax,required:!0}),s.a.createElement("div",{className:"eventError",id:this.state.error},this.state.errorMessage),s.a.createElement("div",{id:"buttonbox"},s.a.createElement("input",{type:"submit",className:"button",id:"add_event",value:"Submit"})))))))}}]),t}(s.a.Component),J=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).goToEvent=a.goToEvent.bind(Object(m.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"goToEvent",value:function(e){e.preventDefault(),this.props.storage.setEvent(this.props.Event),this.props.history.push("/planner")}},{key:"render",value:function(){return s.a.createElement("li",{key:this.props.Key,className:"eventItem",onClick:this.goToEvent,value:this.props.eventName},this.props.eventName)}}]),t}(s.a.Component),z=Object(d.g)(K),Z=a(33),$=a(1),Y=a.n($),Q=function(){function e(){Object(h.a)(this,e),null===Y()("guestList")&&Y()("guestList",[]),null===Y()("itemList")&&Y()("itemList",[]),null===Y()("eventList")&&Y()("eventList",[]),null===Y()("curUser")&&Y()("curUser",void 0),null===Y()("curGuest")&&Y()("curGuest",void 0),null==Y()("curEvent")&&Y()("curEvent",void 0),null==Y()("curGroup")&&Y()("curGroup",void 0),null===Y()("signed")&&Y()("signed",!1)}return Object(p.a)(e,[{key:"setUser",value:function(e){return e instanceof E?(Y()("curUser",e),Y()("signed",!0),!0):e instanceof f&&(Y()("curUser",e),Y()("signed",!0),!0)}},{key:"getUser",value:function(){return Y()("curUser")}},{key:"addGuest",value:function(e){if(void 0!==Y()("curEvent")){var t=Y()("guestList"),a=w(e,Y()("curEvent").pin);return a[0]?(t.push(a[1]),Y()("guestList",t),a):a}return[!1]}},{key:"setGuest",value:function(e){Y()("curGuest",e)}},{key:"deleteGuest",value:function(){if(void 0!==Y()("curGuest")){var e=Y()("guestList");if(S(Y()("curGuest").guestId)[0]){var t=e.filter((function(e,t,a){return e.guestId!==Y()("curGuest").guestId}));return Y()("guestList",t),!0}}return!1}},{key:"updateGuest",value:function(e){if(void 0!==Y()("curGuest")){var t=Y()("guestList");if(k(e,Y()("curGuest").guestId)[0]){for(var a in t)if(t[a].guestId===Y()("curGuest").guestId){t[a].userName=e.email,t[a].name=e.name,t[a].phoneNumber=e.phone,t[a].address=e.address;break}return Y()("guestList",t),!0}}return!1}},{key:"updateGuestUser",value:function(e){if(void 0!==Y()("curUser")&&k(e,Y()("curUser").guestId)[0]){var t=new f(e.email,e.name,e.address,e.phone,Y()("curUser").guestId,Y()("curUser").eventPin);return Y()("curUser",t),!0}return!1}},{key:"getGuest",value:function(){return Y()("curGuest")}},{key:"getGuests",value:function(){if(0!==Y()("guestList").length)return[!0,Y()("guestList")];if(void 0!==Y()("curEvent")){var e=D(Y()("curEvent").pin);return e[0]&&Y()("guestList",e[1]),e}return[!1,"No Current Event"]}},{key:"resetGuest",value:function(){Y()("curGuest",void 0)}},{key:"resetGuests",value:function(){Y()("guestList",[])}},{key:"addEvent",value:function(e){var t=Y()("eventList"),a=I(e,this.getUser().userName);return a[0]&&(t.push(a[1]),Y()("eventList",t)),a}},{key:"setEvent",value:function(e){Y()("curEvent",e)}},{key:"getSingleEvent",value:function(){var e=L(Y()("curUser").eventPin);e[0]&&Y()("curEvent",e[1])}},{key:"getEvent",value:function(){return Y()("curEvent")}},{key:"getEvents",value:function(){if(0!==Y()("eventList").length)return[!0,Y()("eventList")];if(void 0!==Y()("curUser")){var e=G(Y()("curUser"));return e[0]&&Y()("eventList",e[1]),e}return[!1,"No Current User"]}},{key:"getGuestGroup",value:function(){if(void 0!==Y()("curUser")){var e=C(Y()("curUser").guestId);return e[0]?(Y()("curGroup",e[1]),[!0,e[1]]):[!1,"No Group"]}return[!1,"No Current User"]}},{key:"clear",value:function(){Y()("curUser",void 0),Y()("curGuest",void 0),Y()("curEvent",void 0),Y()("curGroup",void 0),Y()("guestList",[]),Y()("itemList",[]),Y()("eventList",[]),Y()("signed",!1)}},{key:"isSigned",value:function(){return Y()("signed")}}]),e}();function V(e){var t=e.isPrivate,a=e.storage,n=Object(Z.a)(e,["isPrivate","storage"]);return t&&!a.isSigned()?s.a.createElement(d.a,{to:"/"}):s.a.createElement(d.b,n)}function ee(){var e=new Q;return s.a.createElement(c.a,null,s.a.createElement(d.d,null,s.a.createElement(V,{path:"/",exact:!0,render:function(t){return s.a.createElement(A,Object.assign({},t,{history:ee.history,storage:e}))},storage:e}),s.a.createElement(V,{path:"/register",render:function(t){return s.a.createElement(q,Object.assign({},t,{history:ee.history,storage:e}))},storage:e}),s.a.createElement(V,{path:"/events",render:function(t){return s.a.createElement(z,Object.assign({},t,{history:ee.history,storage:e}))},isPrivate:!0,storage:e}),s.a.createElement(V,{path:"/planner",render:function(t){return s.a.createElement(H,Object.assign({},t,{history:ee.history,storage:e}))},isPrivate:!0,storage:e}),s.a.createElement(V,{path:"/guest",render:function(t){return s.a.createElement(W,Object.assign({},t,{history:ee.history,storage:e}))},isPrivate:!0,storage:e}),s.a.createElement(V,{render:function(t){return s.a.createElement(A,Object.assign({},t,{history:ee.history,storage:e}))},storage:e})))}V.defaultProps={isPrivate:!1};var te=function(){return s.a.createElement(l.a,{history:o},s.a.createElement(ee,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(te,null),document.getElementById("mainbox")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[35,1,2]]]);
//# sourceMappingURL=main.9705ecef.chunk.js.map