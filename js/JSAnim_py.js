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
