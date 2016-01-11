//-----------------------------------------------------------------------------

QUnit.module("conditions");

//-----------------------------------------------------------------------------

test("set a condition target for a state machine with one simple condition", function() {

  expect(4);

  var conditionTarget = {
    nameOfconditionValueOnTarget: undefined
  };

  var fsm = StateMachine.create({
    target: this,
    conditionTarget: conditionTarget,
    initial: 'green',
    events: [
      { name: 'warn',  from: 'green',  to: 'yellow', condition: 'nameOfconditionValueOnTarget'},
      { name: 'panic', from: 'yellow', to: 'red'    },
      { name: 'calm',  from: 'red',    to: 'yellow' },
      { name: 'clear', from: 'yellow', to: 'green'  }
  ]});

  conditionTarget.nameOfconditionValueOnTarget = false;

  equal(fsm.current, 'green', "initial state should be green");

  //call warn event without condition met
  throws(fsm.warn.bind(fsm), /event warn does not meet condition to transistion from current state green to yellow/);
  equal(fsm.current, 'green', "current state should still be green");

  conditionTarget.nameOfconditionValueOnTarget = true;

  //call warn event with condition met
  fsm.warn();
  equal(fsm.current, 'yellow', "warn event should transisiton from current state green to yellow, since its condition is met");

});

test("simple state machine with one condition, but no condition target set", function() {

  expect(3);

  var conditionTarget = {
    nameOfconditionValueOnTarget: undefined
  };

  var fsm = StateMachine.create({
    target: this,
    initial: 'green',
    events: [
      { name: 'warn',  from: 'green',  to: 'yellow', condition: 'nameOfconditionValueOnTarget'},
      { name: 'panic', from: 'yellow', to: 'red'    },
      { name: 'calm',  from: 'red',    to: 'yellow' },
      { name: 'clear', from: 'yellow', to: 'green'  }
  ]});

  conditionTarget.nameOfconditionValueOnTarget = false;

  equal(fsm.current, 'green', "initial state should be green");

  //call warn event without condition met
  throws(fsm.warn.bind(fsm), "no condition target was set, but a condition defined and tried to be executed");
  equal(fsm.current, 'green', "current state should still be green");
});


