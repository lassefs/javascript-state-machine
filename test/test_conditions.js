//-----------------------------------------------------------------------------

QUnit.module("conditions");

//-----------------------------------------------------------------------------

test("simple state machine with one condition", function() {

  var nameOfconditionValueOnTarget = false;

  var fsm = StateMachine.create({
    target: this,
    initial: 'green',
    events: [
      { name: 'warn',  from: 'green',  to: 'yellow', condition: 'nameOfconditionValueOnTarget'},
      { name: 'panic', from: 'yellow', to: 'red'    },
      { name: 'calm',  from: 'red',    to: 'yellow' },
      { name: 'clear', from: 'yellow', to: 'green'  }
  ]});

  equal(fsm.current, 'green', "initial state should be green");

  //call warn event without condition met
  throws(fsm.warn.bind(fsm), /event warn does not meet condition to transistion from current state green to yellow/);
  equal(fsm.current, 'green', "current state should still be green");

  nameOfconditionValueOnTarget = true;

  //call warn event with condition met
  fsm.warn();
  equal(fsm.current, 'yellow', "warn event should transisiton from current state green to yellow, since its condition is met");

});


