(this["webpackJsonpseating-chart"]=this["webpackJsonpseating-chart"]||[]).push([[0],{15:function(e,t,a){},29:function(e,t,a){e.exports=a(40)},40:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(24),i=a.n(r),o=a(11),c=a(8),l=Object(c.a)(),u=a(14),h=a(1),d=a(3),m=a(4),p=a(6),g=a(5),v=a(7),b=(a(15),function e(t){Object(d.a)(this,e),this.userName=t});function E(e){var t=new XMLHttpRequest;return t.open("POST","http://35.243.169.229:5000/api/login",!1),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("email="+e.user+"&password="+e.pass),t.status}function f(e,t){if(e.pass!==e.repass)return[!1,"Passwords do not match"];if(e.user.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/)){if(e.pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)){if(""!==e.name&&""!==e.user&&""!==e.pass&&""!==e.repass){var a=E(e);if(200===a||204===a)return[!1,"An account already exists for ".concat(e.user)];if(205===a){if(200===function(e){var t=new XMLHttpRequest;return t.open("POST","http://35.243.169.229:5000/api/register",!1),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("full_name="+e.name+"&email="+e.user+"&password="+e.pass),t.status}(e)){var n=new b(e.user);return t.setUser(n),[!0]}return[!1,"Error has occurred"]}return[!1,"Error has occurred"]}return[!1,"Please fill in all fields"]}return[!1,"Passwords must be at least 8 characters long; contain at least 1 lower case letter [a-z]; at least 1 upper case letter [A-Z]; at least 1 number [0-9]"]}return[!1,"".concat(e.user," is not a valid email address")]}var y=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).props.storage.clear(),a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"wrapperbox"},s.a.createElement("div",{id:"welcome"},s.a.createElement("h1",null,"Welcome to Best Fit Seating"),s.a.createElement("h1",null,"Are you here as an Event Planner or as a Guest?")),s.a.createElement("div",{id:"loginbox"},s.a.createElement(j,{history:this.props.history,storage:this.props.storage}),s.a.createElement(O,{history:this.props.history,storage:this.props.storage})))}}]),t}(s.a.Component),O=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).state={gID:"",error:"guestError"},a.changeGID=a.changeGID.bind(Object(h.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(h.a)(a)),a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"changeGID",value:function(e){e.target.value.length>10?this.setState({gID:e.target.value.substr(0,10)}):this.setState({gID:e.target.value})}},{key:"handleSubmit",value:function(e){var t;e.preventDefault(),""!==(t=this.state.gID)&&10===t.length?this.props.history.push("/guest"):this.setState({error:"loginError"})}},{key:"render",value:function(){return s.a.createElement("div",{className:"box",id:"guestLogin"},s.a.createElement("h2",null,"Login as Guest"),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",{className:"infoBox"},s.a.createElement("input",{type:"text",className:"textBox",id:"guestID",placeholder:"Unique Guest ID",value:this.state.gID,onChange:this.changeGID}),s.a.createElement("div",{className:"loginError",id:this.state.error},"Invalid Guest ID")),s.a.createElement("input",{type:"submit",className:"button",id:"guest",value:"CONTINUE"})))}}]),t}(s.a.Component),j=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).state={user:"",pass:"",error:"plannerError"},a.changeUser=a.changeUser.bind(Object(h.a)(a)),a.changePass=a.changePass.bind(Object(h.a)(a)),a.handleRegister=a.handleRegister.bind(Object(h.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(h.a)(a)),a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"changeUser",value:function(e){this.setState({user:e.target.value})}},{key:"changePass",value:function(e){this.setState({pass:e.target.value})}},{key:"handleRegister",value:function(e){e.preventDefault(),this.props.history.push("/register")}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=function(e,t){if(""!==e.user&&""!==e.pass){var a=E(e);if(200===a){var n=new b(e.user);return t.setUser(n),[!0]}return 204===a||205===a?[!1,"Invalid email or password"]:[!1,"Error has occured"]}return[!1,"Please fill in all fields"]}(this.state,this.props.storage);t[0]?this.props.history.push("/events"):(this.setState({error:"loginError"}),this.setState({errorMessage:t[1]})),console.log(t[0])}},{key:"render",value:function(){return s.a.createElement("div",{className:"box",id:"plannerLogin"},s.a.createElement("h2",null,"Login as Planner"),s.a.createElement("form",{"data-testid":"plannerLoginForm",onSubmit:this.handleSubmit},s.a.createElement("div",{className:"infoBox"},s.a.createElement("input",{"data-testid":this.state.user,type:"text",className:"textBox",id:"email",required:!0,placeholder:"E-mail",value:this.state.user,onChange:this.changeUser}),s.a.createElement("input",{"data-testid":this.state.pass,type:"password",className:"textBox",id:"pass",required:!0,placeholder:"Password",value:this.state.pass,onChange:this.changePass}),s.a.createElement("div",{className:"loginError",id:this.state.error},this.state.errorMessage)),s.a.createElement("div",{id:"newRegister",onClick:this.handleRegister},"New User? Click Here to Register"),s.a.createElement("input",{type:"submit",className:"button",id:"planner",value:"LOGIN"})))}}]),t}(s.a.Component),w=Object(o.g)(y),x=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).state={name:"",user:"",pass:"",repass:"",error:"plannerError",errorMessage:"Invalid Registration"},a.changeName=a.changeName.bind(Object(h.a)(a)),a.changeUser=a.changeUser.bind(Object(h.a)(a)),a.changePass=a.changePass.bind(Object(h.a)(a)),a.changeRepass=a.changeRepass.bind(Object(h.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(h.a)(a)),a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"changeName",value:function(e){this.setState({name:e.target.value})}},{key:"changeUser",value:function(e){this.setState({user:e.target.value})}},{key:"changePass",value:function(e){this.setState({pass:e.target.value})}},{key:"changeRepass",value:function(e){this.setState({repass:e.target.value})}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=f(this.state,this.props.storage);t[0]?this.props.history.push("/events"):(this.setState({error:"loginError"}),this.setState({errorMessage:t[1]})),console.log(t[0])}},{key:"render",value:function(){return s.a.createElement("div",{className:"userMain",id:"wrapperbox"},s.a.createElement("form",{id:"registerBox",onSubmit:this.handleSubmit},s.a.createElement("h1",{id:"registerTitle"},"Account Information"),s.a.createElement("div",{id:"inputs"},s.a.createElement("input",{type:"text",className:"textBox",id:"firstName",required:!0,placeholder:"Full Name",value:this.state.name,onChange:this.changeName}),s.a.createElement("input",{type:"text",className:"textBox",id:"e-mail",required:!0,placeholder:"E-mail Address",value:this.state.user,onChange:this.changeUser}),s.a.createElement("input",{type:"password",className:"textBox",id:"password",required:!0,placeholder:"Password",value:this.state.pass,onChange:this.changePass}),s.a.createElement("input",{type:"password",className:"textBox",id:"re_password",required:!0,placeholder:"Re-Enter Password",value:this.state.repass,onChange:this.changeRepass}),s.a.createElement("div",{className:"loginError",id:this.state.error},this.state.errorMessage)),s.a.createElement("input",{type:"submit",className:"button",id:"newUser",value:"Create Account"})))}}]),t}(s.a.Component),k=Object(o.g)(x),N=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).state={clicked:"false",name:"",email:"",phone:"",address:""},a.openDialog=a.openDialog.bind(Object(h.a)(a)),a.closeDialog=a.closeDialog.bind(Object(h.a)(a)),a.changeName=a.changeName.bind(Object(h.a)(a)),a.changeEmail=a.changeEmail.bind(Object(h.a)(a)),a.changeAddress=a.changeAddress.bind(Object(h.a)(a)),a.changePhone=a.changePhone.bind(Object(h.a)(a)),a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"openDialog",value:function(){document.getElementById("dialogbox").style.display="block"}},{key:"closeDialog",value:function(){document.getElementById("dialogbox").style.display="none"}},{key:"changeName",value:function(e){this.setState({name:e.target.value})}},{key:"changeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"changeAddress",value:function(e){this.setState({address:e.target.value})}},{key:"changePhone",value:function(e){this.setState({phone:e.target.value})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{id:"wrapperbox"},s.a.createElement("div",{id:"welcome"},s.a.createElement("h1",null,"Event Title"),s.a.createElement("input",{type:"submit",className:"button",id:"add_guest",value:"Add Guest",onClick:function(){return e.openDialog()}})),s.a.createElement("div",{id:"dialogbox"},s.a.createElement("dialog",{open:!0},s.a.createElement("h1",null,"Add a Guest"),s.a.createElement("form",null,s.a.createElement("input",{type:"text",className:"textBox",id:"name",placeholder:"Name",onChange:this.changeName}),s.a.createElement("input",{type:"text",className:"textBox",id:"email",placeholder:"E-mail",onChange:this.changeEmail}),s.a.createElement("input",{type:"text",className:"textBox",id:"phone",placeholder:"Phone Number",onChange:this.changePhone}),s.a.createElement("input",{type:"text",className:"textBox",id:"address",placeholder:"Address",onChange:this.changeAddress})),s.a.createElement("div",{id:"buttonbox"},s.a.createElement("input",{type:"submit",className:"button",id:"add_guest",value:"Submit",onClick:function(){return e.closeDialog()}})))))}}]),t}(s.a.Component);function S(){return s.a.createElement(N,null)}function P(){return s.a.createElement(L,null)}var L=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"welcome"},s.a.createElement("h1",null,"Welcome to the Guest Page"),s.a.createElement("h1",null,"We are currently working on this page..."))}}]),t}(s.a.Component),C=a(28),I=function(e){function t(e){var a;Object(d.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).state={eventList:a.props.storage.getEvents(),listItems:[]};for(var n=0;n<a.state.eventList.length;n++)a.state.listItems.push(s.a.createElement(U,{Key:n,Event:a.state.eventList[n],storage:a.props.storage,history:a.props.history}));return a.props.storage.setEvent(void 0),a.handleSubmit=a.handleSubmit.bind(Object(h.a)(a)),a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a=this.state.eventList.length;this.props.storage.addEvent("Event"+this.state.eventList.length),this.setState({eventList:this.props.storage.getEvents()}),this.setState((function(e){return{listItems:[].concat(Object(C.a)(e.listItems),[s.a.createElement(U,{Key:a,Event:"Event"+a,storage:t.props.storage,history:t.props.history})])}}))}},{key:"render",value:function(){return s.a.createElement("div",{id:"wrapperbox"},s.a.createElement("div",{id:"welcome"},s.a.createElement("h1",null,"Welcome, ",this.props.storage.getUser(),"!")),s.a.createElement("div",{id:"listWrapper"},s.a.createElement("ul",{id:"eventList"},this.state.listItems),s.a.createElement("input",{type:"submit",className:"button",id:"add_event",value:"Add Event",onClick:this.handleSubmit})))}}]),t}(s.a.Component),U=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).goToEvent=a.goToEvent.bind(Object(h.a)(a)),a}return Object(v.a)(t,e),Object(m.a)(t,[{key:"goToEvent",value:function(e){e.preventDefault(),this.props.storage.setEvent(this.props.Event),this.props.history.push("/planner")}},{key:"render",value:function(){return s.a.createElement("li",{key:this.props.Key,className:"eventItem",onClick:this.goToEvent},this.props.Event)}}]),t}(s.a.Component),D=Object(o.g)(I),B=a(27),R=a(10),A=a.n(R),G=function(){function e(){Object(d.a)(this,e);A()("guestList",[]);A()("itemList",[]);A()("eventList",[])}return Object(m.a)(e,[{key:"setUser",value:function(e){return e instanceof b&&(this.curUser=e,A()("curUser",this.curUser),!0)}},{key:"getUser",value:function(){return this.curUser.userName}},{key:"addGuest",value:function(){}},{key:"addEvent",value:function(e){this.eventList.push(e),A()("eventList",this.eventList)}},{key:"setEvent",value:function(e){this.curEvent=e,A()("curEvent",this.curEvent)}},{key:"getEvents",value:function(){return A()("eventList")}},{key:"clear",value:function(){this.curUser=void 0,A()("curUser",this.curUser),this.curEvent=void 0,A()("curEvent",this.curEvent),this.guestList=[],A()("guestList",this.guestList),this.itemList=[],A()("itemList",this.itemList),this.eventList=[],A()("eventList",this.eventList)}},{key:"hasUser",value:function(){return void 0!==this.curUser}}]),e}();function q(e){var t=e.isPrivate,a=e.storage,n=Object(B.a)(e,["isPrivate","storage"]);return t&&!a.hasUser()?s.a.createElement(o.a,{to:"/"}):s.a.createElement(o.b,n)}function T(){var e=new G;return s.a.createElement(u.a,null,s.a.createElement(o.d,null,s.a.createElement(q,{path:"/",exact:!0,render:function(t){return s.a.createElement(w,Object.assign({},t,{history:T.history,storage:e}))},storage:e}),s.a.createElement(q,{path:"/register",render:function(t){return s.a.createElement(k,Object.assign({},t,{history:T.history,storage:e}))},storage:e}),s.a.createElement(q,{path:"/events",render:function(t){return s.a.createElement(D,Object.assign({},t,{history:T.history,storage:e}))},isPrivate:!0,storage:e}),s.a.createElement(q,{path:"/planner",render:function(t){return s.a.createElement(S,Object.assign({},t,{history:T.history,storage:e}))},isPrivate:!0,storage:e}),s.a.createElement(q,{path:"/guest",render:function(t){return s.a.createElement(P,Object.assign({},t,{history:T.history,storage:e}))},isPrivate:!0,storage:e}),s.a.createElement(q,{render:function(t){return s.a.createElement(w,Object.assign({},t,{history:T.history,storage:e}))},storage:e})))}q.defaultProps={isPrivate:!1};var M=function(){return s.a.createElement(o.c,{history:l},s.a.createElement(T,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(M,null),document.getElementById("mainbox")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[29,1,2]]]);
//# sourceMappingURL=main.252962a4.chunk.js.map