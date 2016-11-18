  /* Define the Animation class */
  function Animation(frames, img_id, slider_id, loop_select_id) {
      this.img_id = img_id;
      this.slider_id = slider_id;
      this.loop_select_id = loop_select_id;
      this.interval = 150; /* original: 30 */
      this.current_frame = 0;
      this.direction = 0;
      this.timer = null;
      this.frames = new Array(frames.length);

      for (var i = 0; i < frames.length; i++) {
          this.frames[i] = new Image();
          this.frames[i].src = frames[i];
      }
      document.getElementById(this.slider_id).max = this.frames.length - 1;
      this.set_frame(this.current_frame);
  }

  Animation.prototype.get_loop_state = function() {
      var button_group = document[this.loop_select_id].state;
      for (var i = 0; i < button_group.length; i++) {
          var button = button_group[i];
          if (button.checked) {
              return button.value;
          }
      }
      return undefined;
  }

  Animation.prototype.set_frame = function(frame) {
      this.current_frame = frame;
      document.getElementById(this.img_id).src = this.frames[this.current_frame].src;
      document.getElementById(this.slider_id).value = this.current_frame;
  }

  Animation.prototype.next_frame = function() {
      this.set_frame(Math.min(this.frames.length - 1, this.current_frame + 1));
  }

  Animation.prototype.previous_frame = function() {
      this.set_frame(Math.max(0, this.current_frame - 1));
  }

  Animation.prototype.first_frame = function() {
      this.set_frame(0);
  }

  Animation.prototype.last_frame = function() {
      this.set_frame(this.frames.length - 1);
  }

  Animation.prototype.slower = function() {
      this.interval /= 0.7;
      if (this.direction > 0) {
          this.play_animation();
      } else if (this.direction < 0) {
          this.reverse_animation();
      }
  }

  Animation.prototype.faster = function() {
      this.interval *= 0.7;
      if (this.direction > 0) {
          this.play_animation();
      } else if (this.direction < 0) {
          this.reverse_animation();
      }
  }

  Animation.prototype.anim_step_forward = function() {
      this.current_frame += 1;
      if (this.current_frame < this.frames.length) {
          this.set_frame(this.current_frame);
      } else {
          var loop_state = this.get_loop_state();
          if (loop_state == "loop") {
              this.first_frame();
          } else if (loop_state == "reflect") {
              this.last_frame();
              this.reverse_animation();
          } else {
              this.pause_animation();
              this.last_frame();
          }
      }
  }

  Animation.prototype.anim_step_reverse = function() {
      this.current_frame -= 1;
      if (this.current_frame >= 0) {
          this.set_frame(this.current_frame);
      } else {
          var loop_state = this.get_loop_state();
          if (loop_state == "loop") {
              this.last_frame();
          } else if (loop_state == "reflect") {
              this.first_frame();
              this.play_animation();
          } else {
              this.pause_animation();
              this.first_frame();
          }
      }
  }

  Animation.prototype.pause_animation = function() {
      this.direction = 0;
      if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
      }
  }

  Animation.prototype.play_animation = function() {
      this.pause_animation();
      this.direction = 1;
      var t = this;
      if (!this.timer) this.timer = setInterval(function() {
          t.anim_step_forward();
      }, this.interval);
  }

  Animation.prototype.reverse_animation = function() {
      this.pause_animation();
      this.direction = -1;
      var t = this;
      if (!this.timer) this.timer = setInterval(function() {
          t.anim_step_reverse();
      }, this.interval);
  }
//** **//

var fPREC = ["qsjfnb6jq1da2hu","3sml971xpp12ryj","3r9bwyefi54gfec","mwg40stb9s1rq5w","vrrzff66u2h2rz8","xircvx07y6o85h1","8ubst2i5dl41izg","f19ejzvik8le7yz","6zuxjopieuct4r5","wdp1k63xt2ji6dn","6wtahdj20rrffxn","dccr444ut0ghata","uxq9z3ukdppc088","k5v0263aoqos2so","drqpkvn6jo4heus","t6hy8o53b92x2j8","db5wgxxu5quit57","4jg1llemur2thjn","4qduuxtxy39an51","mtazcp52wcir19c","j9zrj9yjguv9rmg","ydgvyc8vn95geqs","c719dsej4ythh7j","nuy3rr8067rlwca","589dororku6uzlw","enij0to238aayzs","qo0xlzmr3v8imxj","ogxuu00bjt945o2","wkvxjrp027vyht3","1u61z6td4wavxtd","fffjeh97tedoall","frbrzjdltifqdy1","5qb9p1gylq9qjrd","8oajyr3z92bbxs3","fga5ie9c2xeuxbn","urjhihizi9y14a7","wnv6t4xnhphnxrc","mp2oiida3e6w087","dsz2pd7sn9co0mt","g9w28ohtnl7c4my","w5zoa8y0n2ndhot","pq58q9pj0j75jah","dn0cau25kd19su7","hq3if2m8953lf5m","yt9x20gda8z3jct","a6qqjkurn1i13nw","9ih267lxx7ug4d4","gfh6kht73h4islc","uog2j15hocg7dhi"]
var framesPREC = new Array(48);
for (var i = 0; i < 48; i++) {
    /* frames[i] =  "frames/frame" + ("00" + (i + 1)).slice(-3) + ".png"; */
    framesPREC[i] = "https://dl.dropboxusercontent.com/s/" + fPREC[i] + "/img_" + ("0" + (i + 0)).slice(-2) + ".png";
}
/* Name of 'anim' variable should be unique, and match what's specified
   in the template above */
var fTEMP = ["li97xoefc1l4di1","7oualulki2mv6a6","r9wy0s33lhcolty","xyngeodpg1puow2","1bu3a9ue8ul3ysz","794jikhwesnhij1","waktv7o5v8adevo","em11z4zka80asle","c7d8qhhmuwvy49b","dl68jx3k9nquftz","4br607ljio914h3","ejrnf2385voded8","ttupkqu5kp2l1be","x4w2ajvfc6u9uqz","ib5yxbwb3b12kn8","80sd047nk2c4d3u","162irnec4qs9f7g","301vgr45hcc95bk","d5emay8mxzkmboc","p3jglvkm1ns30o6","3fdszm5yoo448di","izpajzvlqyvvzj5","2vsybmdurplvs3r","wyfoizepcguos1f","426c6zjhp8i4mut","ljru9yxrd7rfgdf","f5c6e16v3lvrnvr","ri4mr0r5lxsafxr","w5v067cf2dukydh","00s6b0sj1dgfn0x","zjjanq47c51g2zo","laqo3jsma0eif6h","3iqq3ilhxw7ew98","y66vgdzphu81vat","genofgm7r6azfw7","oj9ne589c97fsv3","tih74miu1qc01dx","ovbt8oqykmqbkh6","bw4z99mxp9m3nae","ghatrvoq02d0qj3","akd07hircvobx6j","lu94jvn95rqxh5r","kuzgrl8tn1ovshb","z20uq7u3cepj5vl","iovuxlp8zkssy03","xnj74agq5lepi93","e6evr7yhpl5zbcf","708m5bs0m9zf6mi","4iti4djp67gu5gt"]
var framesTEMP = new Array(48);
for (var i = 0; i < 48; i++) {
    /* frames[i] =  "frames/frame" + ("00" + (i + 1)).slice(-3) + ".png"; */
    framesTEMP[i] = "https://dl.dropboxusercontent.com/s/" + fTEMP[i] + "/img_" + ("0" + (i + 0)).slice(-2) + ".png";
}

var fWIND = ["xxk6oqkmr27hh3q","7hoeta1er7lz6gl","uu5s8qujjsoh3de","7vn2aaylgyygitj","a0c294yxdae6crn","bw6tqvncxejoup2","blpptlr41z23tok","o7udli1fk7nvf32","6rjjooysku8terw","e9zyc8x9w2hem6g","2qy61y5knkkvnf9","a84r44agiojw0is","mr26hqiq48sw3p3","5zazgyjigokbmrw","gw7ewqaqns31o7g","osv1qb1g6sbic8g","dw2nd9plyidy85z","tzcu0lo5w0sl6iu","8skkb51timy3n0a","7kil97uh2prlhh9","reornatizxcth6s","wawk4uh3owfwaie","id1xzvvc7wwoomn","cyjuj54wuokg92e","pjac6te119wxuke","drlm83u06fnp964","kbqean2wgnlb9fv","qj3of84uyp0v0hl","5k4mbujtab5aors","6grqya0mtd1dkpy","95pmxo00cskaf03","d6mjaczh0s616ip","754rrzp88nm0g2p","873gdztwsr2j1y5","5oseykpmn67wm2v","s6brb46nlljthgj","5lpxbmle8677z6o","gdil1gjuyq6qbc3","ch7s7s78ujaa8kf","zwsj23vx7wjrtvl","3ovlw0m3tjngei7","lrhjdj6q53oy1k1","v8v0fm7c8mbmow9","ylr88gj9pikyv1u","7ux9tx4t2dwl52q","66oa0pf5w2wwu06","grf3ant3whljojv","ufm2ytt4ul443u0","33idmlh26ragmv2"]
var framesWIND = new Array(48);
for (var i = 0; i < 48; i++) {
    /* frames[i] =  "frames/frame" + ("00" + (i + 1)).slice(-3) + ".png"; */
    framesWIND[i] = "https://dl.dropboxusercontent.com/s/" + fWIND[i] + "/img_" + ("0" + (i + 0)).slice(-2) + ".png";
}
