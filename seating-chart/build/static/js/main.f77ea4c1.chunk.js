(this["webpackJsonpseating-chart"]=this["webpackJsonpseating-chart"]||[]).push([[0],{18:function(e,t,a){},35:function(e,t,a){e.exports=a(48)},48:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(30),i=a.n(s),o=a(33),l=a(13),c=Object(l.a)(),u=a(15),h=a(14),d=a(3),m=a(5),p=a(7),g=a(9),v=a(8),b=a(10),E=(a(18),function e(t){Object(m.a)(this,e),this.userName=t});function f(e){var t=new XMLHttpRequest;return t.open("POST","http://35.243.169.229:5000/api/login",!1),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("email="+e.user+"&password="+e.pass),t.status}function y(e,t){if(e.pass!==e.repass)return[!1,"Passwords do not match"];if(e.user.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/)){if(e.pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)){if(""!==e.name&&""!==e.user&&""!==e.pass&&""!==e.repass){var a=f(e);if(200===a||204===a)return[!1,"An account already exists for ".concat(e.user)];if(205===a){if(200===function(e){var t=new XMLHttpRequest;return t.open("POST","http://35.243.169.229:5000/api/register",!1),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("full_name="+e.name+"&email="+e.user+"&password="+e.pass),t.status}(e)){var n=new E(e.user);return t.setUser(n),[!0]}return[!1,"Error has occurred"]}return[!1,"Error has occurred"]}return[!1,"Please fill in all fields"]}return[!1,"Passwords must be at least 8 characters long; contain at least 1 lower case letter [a-z]; at least 1 upper case letter [A-Z]; at least 1 number [0-9]"]}return[!1,"".concat(e.user," is not a valid email address")]}var O=function(e){function t(){return Object(m.a)(this,t),Object(g.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{id:"wrapperbox"},r.a.createElement("div",{id:"welcome"},r.a.createElement("h1",null,"Welcome to Best Fit Seating"),r.a.createElement("h1",null,"Are you here as an Event Planner or as a Guest?")),r.a.createElement("div",{id:"loginbox"},r.a.createElement(k,{history:this.props.history,storage:this.props.storage}),r.a.createElement(j,{history:this.props.history,storage:this.props.storage})))}}]),t}(r.a.Component),j=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={gID:"",error:"guestError"},a.changeGID=a.changeGID.bind(Object(d.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"changeGID",value:function(e){e.target.value.length>10?this.setState({gID:e.target.value.substr(0,10)}):this.setState({gID:e.target.value})}},{key:"handleSubmit",value:function(e){var t;e.preventDefault(),""!==(t=this.state.gID)&&10===t.length?this.props.history.push("/guest"):this.setState({error:"loginError"})}},{key:"render",value:function(){return r.a.createElement("div",{className:"box",id:"guestLogin"},r.a.createElement("h2",null,"Login as Guest"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"infoBox"},r.a.createElement("input",{type:"text",className:"textBox",id:"guestID",placeholder:"Unique Guest ID",value:this.state.gID,onChange:this.changeGID}),r.a.createElement("div",{className:"loginError",id:this.state.error},"Invalid Guest ID")),r.a.createElement("input",{type:"submit",className:"button",id:"guest",value:"CONTINUE"})))}}]),t}(r.a.Component),k=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={user:"",pass:"",error:"plannerError"},a.changeUser=a.changeUser.bind(Object(d.a)(a)),a.changePass=a.changePass.bind(Object(d.a)(a)),a.handleRegister=a.handleRegister.bind(Object(d.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"changeUser",value:function(e){this.setState({user:e.target.value})}},{key:"changePass",value:function(e){this.setState({pass:e.target.value})}},{key:"handleRegister",value:function(e){e.preventDefault(),this.props.history.push("/register")}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=function(e,t){if(""!==e.user&&""!==e.pass){var a=f(e);if(200===a){var n=new E(e.user);return t.setUser(n),[!0]}return 204===a||205===a?[!1,"Invalid email or password"]:[!1,"Error has occured"]}return[!1,"Please fill in all fields"]}(this.state,this.props.storage);t[0]?this.props.history.push("/events"):(this.setState({error:"loginError"}),this.setState({errorMessage:t[1]}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"box",id:"plannerLogin"},r.a.createElement("h2",null,"Login as Planner"),r.a.createElement("form",{"data-testid":"plannerLoginForm",onSubmit:this.handleSubmit},r.a.createElement("div",{className:"infoBox"},r.a.createElement("input",{"data-testid":this.state.user,type:"text",className:"textBox",id:"email",required:!0,placeholder:"E-mail",value:this.state.user,onChange:this.changeUser}),r.a.createElement("input",{"data-testid":this.state.pass,type:"password",className:"textBox",id:"pass",required:!0,placeholder:"Password",value:this.state.pass,onChange:this.changePass}),r.a.createElement("div",{className:"loginError",id:this.state.error},this.state.errorMessage)),r.a.createElement("div",{id:"newRegister",onClick:this.handleRegister},"New User? Click Here to Register"),r.a.createElement("input",{type:"submit",className:"button",id:"planner",value:"LOGIN"})))}}]),t}(r.a.Component),x=Object(h.g)(O),w=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={name:"",user:"",pass:"",repass:"",error:"plannerError",errorMessage:"Invalid Registration"},a.changeName=a.changeName.bind(Object(d.a)(a)),a.changeUser=a.changeUser.bind(Object(d.a)(a)),a.changePass=a.changePass.bind(Object(d.a)(a)),a.changeRepass=a.changeRepass.bind(Object(d.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"changeName",value:function(e){this.setState({name:e.target.value})}},{key:"changeUser",value:function(e){this.setState({user:e.target.value})}},{key:"changePass",value:function(e){this.setState({pass:e.target.value})}},{key:"changeRepass",value:function(e){this.setState({repass:e.target.value})}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=y(this.state,this.props.storage);t[0]?this.props.history.push("/events"):(this.setState({error:"loginError"}),this.setState({errorMessage:t[1]})),console.log(t[0])}},{key:"render",value:function(){return r.a.createElement("div",{className:"userMain",id:"wrapperbox"},r.a.createElement("form",{id:"registerBox",onSubmit:this.handleSubmit},r.a.createElement("h1",{id:"registerTitle"},"Account Information"),r.a.createElement("div",{id:"inputs"},r.a.createElement("input",{type:"text",className:"textBox",id:"firstName",required:!0,placeholder:"Full Name",value:this.state.name,onChange:this.changeName}),r.a.createElement("input",{type:"text",className:"textBox",id:"e-mail",required:!0,placeholder:"E-mail Address",value:this.state.user,onChange:this.changeUser}),r.a.createElement("input",{type:"password",className:"textBox",id:"password",required:!0,placeholder:"Password",value:this.state.pass,onChange:this.changePass}),r.a.createElement("input",{type:"password",className:"textBox",id:"re_password",required:!0,placeholder:"Re-Enter Password",value:this.state.repass,onChange:this.changeRepass}),r.a.createElement("div",{className:"loginError",id:this.state.error},this.state.errorMessage)),r.a.createElement("input",{type:"submit",className:"button",id:"newUser",value:"Create Account"})))}}]),t}(r.a.Component),N=Object(h.g)(w),S=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={clicked:"false",name:"",email:"",phone:"",address:""},a.openDialog=a.openDialog.bind(Object(d.a)(a)),a.closeDialog=a.closeDialog.bind(Object(d.a)(a)),a.changeName=a.changeName.bind(Object(d.a)(a)),a.changeEmail=a.changeEmail.bind(Object(d.a)(a)),a.changeAddress=a.changeAddress.bind(Object(d.a)(a)),a.changePhone=a.changePhone.bind(Object(d.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"openDialog",value:function(){document.getElementById("dialogbox").style.display="block"}},{key:"closeDialog",value:function(){document.getElementById("dialogbox").style.display="none"}},{key:"changeName",value:function(e){this.setState({name:e.target.value})}},{key:"changeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"changeAddress",value:function(e){this.setState({address:e.target.value})}},{key:"changePhone",value:function(e){this.setState({phone:e.target.value})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"wrapperbox"},r.a.createElement("div",{id:"welcome"},r.a.createElement("h1",null,"Event Title"),r.a.createElement("input",{type:"submit",className:"button",id:"add_guest",value:"Add Guest",onClick:function(){return e.openDialog()}})),r.a.createElement("div",{id:"dialogbox"},r.a.createElement("dialog",{open:!0},r.a.createElement("h1",null,"Add a Guest"),r.a.createElement("form",null,r.a.createElement("input",{type:"text",className:"textBox",id:"name",placeholder:"Name",onChange:this.changeName}),r.a.createElement("input",{type:"text",className:"textBox",id:"email",placeholder:"E-mail",onChange:this.changeEmail}),r.a.createElement("input",{type:"text",className:"textBox",id:"phone",placeholder:"Phone Number",onChange:this.changePhone}),r.a.createElement("input",{type:"text",className:"textBox",id:"address",placeholder:"Address",onChange:this.changeAddress})),r.a.createElement("div",{id:"buttonbox"},r.a.createElement("input",{type:"submit",className:"button",id:"add_guest",value:"Submit",onClick:function(){return e.closeDialog()}})))))}}]),t}(r.a.Component);function L(){return r.a.createElement(S,null)}function P(){return r.a.createElement(C,null)}var C=function(e){function t(){return Object(m.a)(this,t),Object(g.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{id:"welcome"},r.a.createElement("h1",null,"Welcome to the Guest Page"),r.a.createElement("h1",null,"We are currently working on this page..."))}}]),t}(r.a.Component),D=a(34),I=function(e){function t(e){var a;Object(m.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={eventList:a.props.storage.getEvents(),listItems:[]};for(var n=0;n<a.state.eventList.length;n++)a.state.listItems.push(r.a.createElement(U,{Key:n,Event:a.state.eventList[n],storage:a.props.storage,history:a.props.history}));return a.props.storage.setEvent(void 0),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(a)),a.handleLogout=a.handleLogout.bind(Object(d.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a=this.state.eventList.length;this.props.storage.addEvent("Event"+this.state.eventList.length),this.setState({eventList:this.props.storage.getEvents()}),this.setState((function(e){return{listItems:[].concat(Object(D.a)(e.listItems),[r.a.createElement(U,{Key:a,Event:"Event"+a,storage:t.props.storage,history:t.props.history})])}}))}},{key:"handleLogout",value:function(e){e.preventDefault(),this.props.storage.clear(),this.props.history.push("/")}},{key:"render",value:function(){return r.a.createElement("div",{id:"logoutBox"},r.a.createElement("div",{id:"wrapperbox"},r.a.createElement("div",{id:"welcome"},r.a.createElement("div",{className:"button",id:"logout",onClick:this.handleLogout},"Logout"),r.a.createElement("h1",null,"Welcome, ",this.props.storage.getUser(),"!")),r.a.createElement("div",{id:"listWrapper"},r.a.createElement("ul",{id:"eventList"},this.state.listItems),r.a.createElement("input",{type:"submit",className:"button",id:"add_event",value:"Add Event",onClick:this.handleSubmit}))))}}]),t}(r.a.Component),U=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).goToEvent=a.goToEvent.bind(Object(d.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"goToEvent",value:function(e){e.preventDefault(),this.props.storage.setEvent(this.props.Event),this.props.history.push("/planner")}},{key:"render",value:function(){return r.a.createElement("li",{key:this.props.Key,className:"eventItem",onClick:this.goToEvent},this.props.Event)}}]),t}(r.a.Component),B=Object(h.g)(I),R=a(32),A=a(2),G=a.n(A),q=function(){function e(){Object(m.a)(this,e),null===G()("guestList")&&G()("guestList",[]),null===G()("itemList")&&G()("itemList",[]),null===G()("eventList")&&G()("eventList",[]),null===G()("curUser")&&G()("curUser",void 0),null==G()("curEvent")&&G()("curEvent",void 0),null===G()("signed")&&G()("signed",!1)}return Object(p.a)(e,[{key:"setUser",value:function(e){return e instanceof E&&(G()("curUser",e),G()("signed",!0),!0)}},{key:"getUser",value:function(){return G()("curUser").userName}},{key:"addGuest",value:function(){}},{key:"addEvent",value:function(e){var t=G()("eventList");t.push(e),G()("eventList",t)}},{key:"setEvent",value:function(e){G()("curEvent",e)}},{key:"getEvents",value:function(){return G()("eventList")}},{key:"clear",value:function(){G()("curUser",void 0),G()("curEvent",void 0),G()("guestList",[]),G()("itemList",[]),G()("eventList",[]),G()("signed",!1)}},{key:"isSigned",value:function(){return G()("signed")}}]),e}();function T(e){var t=e.isPrivate,a=e.storage,n=Object(R.a)(e,["isPrivate","storage"]);return t&&!a.isSigned()?r.a.createElement(h.a,{to:"/"}):r.a.createElement(h.b,n)}function M(){var e=new q;return r.a.createElement(u.a,null,r.a.createElement(h.d,null,r.a.createElement(T,{path:"/",exact:!0,render:function(t){return r.a.createElement(x,Object.assign({},t,{history:M.history,storage:e}))},storage:e}),r.a.createElement(T,{path:"/register",render:function(t){return r.a.createElement(N,Object.assign({},t,{history:M.history,storage:e}))},storage:e}),r.a.createElement(T,{path:"/events",render:function(t){return r.a.createElement(B,Object.assign({},t,{history:M.history,storage:e}))},isPrivate:!0,storage:e}),r.a.createElement(T,{path:"/planner",render:function(t){return r.a.createElement(L,Object.assign({},t,{history:M.history,storage:e}))},isPrivate:!0,storage:e}),r.a.createElement(T,{path:"/guest",render:function(t){return r.a.createElement(P,Object.assign({},t,{history:M.history,storage:e}))},isPrivate:!0,storage:e}),r.a.createElement(T,{render:function(t){return r.a.createElement(x,Object.assign({},t,{history:M.history,storage:e}))},storage:e})))}T.defaultProps={isPrivate:!1};var W=function(){return r.a.createElement(o.a,{history:c},r.a.createElement(M,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(W,null),document.getElementById("mainbox")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[35,1,2]]]);
//# sourceMappingURL=main.f77ea4c1.chunk.js.map