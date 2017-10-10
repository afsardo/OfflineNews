<?php

use App\Article;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	Article::truncate();
        Article::create([
        	"title" => "Brexit: Article 50 has been triggered - what now?", 
        	"content" => "Britain is officially on its way out of the European Union after 44 years as a member after invoking a part of European law known as Article 50 on Wednesday."
        ]);
        Article::create([
        	"title" => "Can coal make a comeback under Trump?", 
        	"content" => "Donald Trump has signed an executive order which lifts climate change regulations. One of the president's campaign promises was to revive a declining coal industry."
        ]);
        Article::create([
        	"title" => "Neuroprosthesis enables paralysed man to feed himself", 
        	"content" => "Bill Kochevar was paralysed from the shoulders down in a bicycle accident. He can now eat and drink again thanks to new technology which reconnects his brain with his muscles."
        ]);
        Article::create([
        	"title" => "Russia arrest 'like a bad dream'", 
        	"content" => "Tens of thousands of Russians took to the streets on Sunday to protest against government corruption - it was the country's largest anti-government protest in several years. One of the most striking photos of the day showed a smartly-dressed woman being carried away by several police officers in Moscow."
        ]);
        /*Article::create([
        	"title" => "", 
        	"content" => ""
        ]);*/
    }
}
