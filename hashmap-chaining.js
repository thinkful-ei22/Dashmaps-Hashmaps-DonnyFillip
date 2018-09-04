'use strict';
const LinkedList = require('./linked-list');

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

    if(index.deleted !== false){
      this.length++;
    }

    index.value= value;
    index.deleted = false;

    // if(!this._slots[index]){
    //   const linkedList = new LinkedList();
    //   linkedList.insertLast({key, value});
    //   console.log('linked List',JSON.stringify(linkedList));
    //   this._slots[index] = linkedList;
    // }

    // else {
    //   const linkedList = this._slots[index];
    //   linkedList.insertLast({key,value});
    //   console.log('linked List',JSON.stringify(linkedList));


    // }

    // this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
    //   throw new Error('Key error');
    //   console.log('RETURN NULL');
      return null;
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
  
    const index = hash % this._capacity;
    let slot = this._slots[index];
    if (slot === undefined ){
      return this._slots[index] = {key};
    }

    console.log('key', {key});

    if(slot.key === key) {
      return slot;
    }

    while (slot.next) {
      slot = slot.next;
      if(slot.key === key){
        return slot;
      }
    }

    return slot.next = {key};

    // for (let i=start; i<start + this._capacity; i++) {
    // const index = start % this._capacity;
    // console.log('index', index);
    // const slot = this._slots[index];
    // if (slot === undefined || (slot.key === key && !slot.deleted)) {


    // return index;
    // }
    // }
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
  //   lotr.set('Wizard','Gandolf');
  //   lotr.set('Human','Aragorn');
  //   console.log(lotr.set('Elf','Legolas'));
  //   lotr.set('Maiar','The Necromancer');
  //   lotr.set('Maiar','Sauron');
  //   lotr.set('Ringbearer','Gollum');
  //   lotr.set('LadyOfLight','Galadriel');
  //   lotr.set('HalfElven', 'Arwen');
  //   lotr.set('Ent', 'Treebeard');

  console.log(lotr);



}

main();