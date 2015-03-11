angular
  .module('WebAudio', [])
  .service('OSC', function() {
    var self;

    function Oscillator(ctx) {
      self = this;
      self.osc = ctx.createOscillator();

      return self;
    }

    Oscillator.prototype.setOscType = function(type){
      if(type) {
        self.osc.type = type;
      }

    };

    Oscillator.prototype.setFrequency = function(freq, time){
      self.osc.frequency.setTargetAtTime(freq, 0, time);
    };

    Oscillator.prototype.start = function(pos){
      self.osc.start(pos);
    };

    Oscillator.prototype.stop = function(pos){
      self.osc.stop(pos);
    };

    Oscillator.prototype.connect = function(i){
      self.osc.connect(i);
    };

    Oscillator.prototype.cancel = function(){
      self.osc.frequency.cancelSceduledValues(0);
    };

    return Oscillator;
});

function _createContext() {
    self.ctx = new $window.AudioContext();
}
