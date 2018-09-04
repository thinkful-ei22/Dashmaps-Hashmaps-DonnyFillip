'use strict';

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      //   throw new Error('Key error');
      console.log('RETURN NULL');
      return null;
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
    //   throw new Error('Key error');
      console.log('RETURN NULL');
      return null;
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.7;
HashMap.SIZE_RATIO = 3;




function main(){
  const lotrData= [{Hobbit:'Bilbo'}, {Hobbit:'Frodo'}, {Wizard:'Gandolf'}, {Human:'Aragon'}, {Elf: 'Legolas'}, {Maiar:'The Necromancer'}, {Maiar: 'Sauron'}, {RingBearer: 'Gollum'}, {LadyOfLight: 'Galadriel'}, {HalfElven: 'Arwen'}, {Ent: 'Treebeard'}];
  const lotr = new HashMap();

  lotr.set('Hobbit','Bilbo');
  lotr.set('Hobbit','Frodo');
  lotr.set('Wizard','Gandolf');
  lotr.set('Human','Aragorn');
  lotr.set('Elf','Legolas');
  lotr.set('Maiar','The Necromancer');
  lotr.set('Maiar','Sauron');
  lotr.set('Ringbearer','Gollum');
  lotr.set('LadyOfLight','Galadriel');
  lotr.set('HalfElven', 'Arwen');
  lotr.set('Ent', 'Treebeard');

  //   console.log(JSON.stringify(lotr));

  console.log(lotr.get('Hobbit'));

}

// main();

//given "acecarr" - return true (because acecarr can be rearranged to racecar which is a palindrome)
//given north - returns false, because no rearrangement is a palindrome


function palindrome(str){
  str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  //string
  const hashmap = new HashMap();
  //make our hashmap
  //loop through string array
  for (let i=0; i < str.length; i++){

    if(hashmap.get(str[i]) === null){
      hashmap.set(str[i],1);

    } else {
      let count=hashmap.get(str[i]);
      count++;
      console.log('count',count);
      hashmap.set(str[i],count);
    
    }
 

  }


  console.log(hashmap);

  //to check if a string is a palindrome
  //count number of characters in string
  //for all letters there needs to an even amount of letters
  // eg for racecar - 2 as, 2rs, 2c,s one 3
  let oddCounter = 0;

  for(let i=0; i < str.length; i++){

    //if number is even 
    // if odd - add to counter
    if(hashmap.get(str[i]) %2 === 1){
      oddCounter++;
    } 
  }

  if(oddCounter > 1){
    return false; 
  } else{
    return true;
  }
 

}


//check odd counter - if greater than 1 not a palindrome


console.log(palindrome('Aasdfasdjfh asaN'));