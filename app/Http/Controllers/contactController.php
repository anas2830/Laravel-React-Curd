<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contact;

class contactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cantacts = Contact::all();
        return response()->json(['status' => 200, 'contacts' => $cantacts]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $checkboxArray = $request[1];
        $checkboxArray = array_filter($checkboxArray);
        $checked = [];
        if(!empty($checkboxArray)){
            foreach($checkboxArray as $index => $checkId){
                $checked[] = $index;
            }            
        }

        $selectedArray = $request[2];
        $selectedArray = array_filter($selectedArray);
        $selected = [];
        if(!empty($selectedArray)){
            foreach($selectedArray as $index => $selectId){
                $selected[] = $selectId;
            }            
        }

        $result = Contact::create([

            'fullName'  => $request[0]['fullName'], 
            'email'     => $request[0]['email'],
            'phone'     => $request[0]['phone'],
            'country'   => $request[0]['country'],
            'bio'       => $request[0]['bio'],
            'dob'       => $request[0]['birthday'],
            'gender'    => $request[0]['gender'],
            'sports'    => json_encode($checked),
            'fruits'    => json_encode($selected),
        ]);

        if($result){
            return response()->json(['status' => 200]);
        }else{
            return response()->json('sorry');
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $cantacts = Contact::find($id);
        return response()->json(['status' => 200, 'contact' => $cantacts]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $checkboxArray = $request[1];
        $checkboxArray = array_filter($checkboxArray);
        $checked = [];
        if(!empty($checkboxArray)){
            foreach($checkboxArray as $index => $checkId){
                $checked[] = $index;
            }            
        }

        $selectedArray = $request[2];
        $selectedArray = array_filter($selectedArray);
        $selected = [];
        if(!empty($selectedArray)){
            foreach($selectedArray as $index => $selectId){
                $selected[] = $selectId;
            }            
        }
        
        $contact = Contact::find($id);
        $contact->fullName = $request[0]['fullName'];
        $contact->email = $request[0]['email'];
        $contact->phone = $request[0]['phone'];
        $contact->country = $request[0]['country'];
        $contact->bio = $request[0]['bio'];
        $contact->dob = $request[0]['birthday'];
        $contact->gender = $request[0]['gender'];
        $contact->sports = json_encode($checked);
        $contact->fruits = json_encode($selected);

        if($contact->save()){
            return response()->json(['status' => 200]);
        }else{
            return response()->json('sorry');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contact = Contact::find($id);
        if($contact->delete()){
            return response()->json(['status' => 200]);
        }
    }
}
