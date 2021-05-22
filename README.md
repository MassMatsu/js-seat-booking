##### Movie seat booking app
it is imitating a seat booking system letting a user choose the movie from the list and seat on the UI by clicking.

link to checkout! - https://js-seat-booking.netlify.app/

##### how to use
** have a experience to book your movie ticket **
1. pick a movie you like to watch from the list
2. select a seat by clicking on UI
3. if you are happy with your movie and seats you select, press button to purchase
4. you can see the details of your purchase

##### features
- [x] dropdown movie list to choose a movie
- [x] easy to select a seat through UI intuitively
- [x] live information about how many seats and total price
- [x] with purchase button, it shows details of your purchase how many tickets, what movie, total price, and seat no
- [x] all purchase records will be stored in the local storage as transactions for future development of this app.

##### summary
- it stores a movie ticket data to maintain a sigle transaction and also it is stored into an array as transactions history
- setData plays a role to set inital data or load data from local storage and update it by taking new data as arguments
- selected seats are diplayed in orange by toggling 'selected' class and forEach to check all seats with the class
- live seats status is updated by forEach through all seats to be checked for 'selected' class
- resetData plays a role to clear data for a single transaction and set initial value once the purchase button is clicked 
- purchase details message appears with css class toggling

##### DEMO
<img src="https://user-images.githubusercontent.com/66154455/117386971-d90a1e80-af22-11eb-8dd6-003fd0f22331.gif" width="400px">
