
1st Exercise: courseinfo

Not very important: react will remind you

a) Always remember to use curly braces on JS
b) when using a list 

[<p key=1> something </p>,
<p> key=2> other </p>
]

always use a key, even if it is not a li. 
c) onSubmit is on the form, not the input.




2nd Exercise: phonebook

A) Very important, 
when passing down event handlers to children, that are even able to modify the internal state of the parent, 
these functions have a reference to the internal function of the parent. It is not a "copy and paste". 
So, if the function has reference to some state, "exampleState" for example, 
we do not need to pass this state to the children! The handlerFunction is enough!





3rd Exercise: data for countries.


A) We didn't need to fetch the image with axios! 
We just set <img src=link>!!! That's enough!

