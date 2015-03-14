angular
  .module('WebAudio', [])
  .service('AMP', function() {
        var self;

        function Gain(ctx) {
            self = this;

            self.gain = ctx.createGain();

            return self;
        }

        Gain.prototype.setVolume = function(volume, time) {
            self.gain.gain.setTargetAtTime(volume, 0, time);
        }

        Gain.prototype.connect = function(i) {
            self.gain.connect(i);
        }

        Gain.prototype.cancel = function() {
            self.gain.gain.cancelScheduledValues(0);
        }

        Gain.prototype.disconnect = function() {
            self.gain.disconnect(0);
        }

        return Gain;
    })
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
      self.osc.frequency.cancelScheduledValues(0);
    };

    return Oscillator;
})
.service('FTR', function(){
  var self;

  function Filter(ctx) {
    self = this;

    self.filter = ctx.createBiquadFilter();

    return self;
  }

  Filter.prototype.setFilterType = function(type){
    if(type) {
      self.filter.type = type;
    }
  };

  Filter.prototype.setFilterFrequency = function(freq){
    if(freq) {
      self.filter.frequency.value = freq;
    }
  };

  Filter.prototype.setFilterResonance = function(res){
    if(res) {
      self.filter.Q.value = res;
    }
  };

  Filter.prototype.connect = function(i){
    self.filter.connect(i);
  };

  Filter.prototype.disconnect = function(){
    self.filter.disconnect(0);
  };

  return Filter;

})
.factory('AudioEngine', ['OSC', 'AMP', 'FTR', '$window', function(){
  var self = this;

  self.activeNotes = [];
  self.settings = {
    attack: 0.05,
    release: 0.05,
    portamento: 0.05
  };

  self.detuneAmount = 0;
  self.currentFreq = null;

  function _createContext() {
    self.ctx = new $window.AudioContext();
  }

}]);

function _createContext() {
    self.ctx = new $window.AudioContext();
}
