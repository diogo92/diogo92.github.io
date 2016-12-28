//Contains the machine logic
//Representation of the machine, each value represents the slot in that position
/*  Line 4              Line 5
           \          /
    Line 2  |[] [] []|  ------ Line 2
    Line 1  |[] [] []|  ------ Line 1
    Line 3  |[] [] []|  ------ Line 3
           /          \
    Line 5             Line 4
*/
var Machine = [
    0,0,0,
    0,0,0,
    0,0,0
];

//Array containing the full line combinations, where every index represents an individual line
var Lines =[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];


//get the line at the specified position line number goes from 1 to 5
function GetLine(lineNo){
    return Lines[lineNo-1];
}

//Set the specified value to the machine array index
function SetMachineSlotValue(index,value){
    Machine[index] = value;
}

//Machine will update on every spin end, to the value of each slot. We then set the Lines array to see the combinations in each line
function SetLines(){
    Lines[0] = [Machine[3],Machine[4],Machine[5]]; //Line 1
    Lines[1] = [Machine[0],Machine[1],Machine[2]]; //Line 2
    Lines[2] = [Machine[6],Machine[7],Machine[8]]; //Line 3
    Lines[3] = [Machine[0],Machine[4],Machine[8]]; //Line 4
    Lines[4] = [Machine[6],Machine[4],Machine[2]]; //Line 5
}

//Check if the specified line is a winner
function WonLine(lineNo){
    if(Lines[lineNo][0] == Lines[lineNo][1] && Lines[lineNo][0] == Lines[lineNo][2])
        return true;
    else   
        return false;
}


