/* All locators in Playwright by default work with elements in Shadow DOM. 

The exceptions are:
 Locating by XPath does not pierce shadow roots.
 Closed-mode shadow roots are not supported.

When the mode of a shadow root is "closed" , the shadow root's implementation internals 
are inaccessible and unchangeable from JavaScript—in the same way the implementation 
internals of, for example, the <video> element are inaccessible and unchangeable from JavaScript.

Normally, Elements of the shadow root are accessible from JavaScript outside the root, :
element.attachShadow({ mode: "open" });

closed mode denies access to the node(s) of a closed shadow root from JavaScript outside it:

element.attachShadow({ mode: "closed" }); */