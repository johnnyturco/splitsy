puts "Clearing Database..."
Bill.destroy_all
User.destroy_all
Item.destroy_all

puts "Creating users..."
anna = User.create(first_name: "Anna", last_name: "Harder", username: "annaqhh", password: "123", venmo_username: "annaqhh")
johnny = User.create(first_name: "Johnny", last_name: "Turco", username: "johnnyturco", password: "123", venmo_username: "johnnyturco")
oren = User.create(first_name: "Oren", last_name: "Noyes", username: "orennoyes", password: "123", venmo_username: "oren-noyes")
rachel = User.create(first_name: "Rachel", last_name: "Humes", username: "rhumes", password: "123", venmo_username: "weechal")
mike = User.create(first_name: "Mike", last_name: "Davis", username: "mdavis", password: "123", venmo_username: "micdavis93")
hannah = User.create(first_name: "Hannah", last_name: "Lyford", username: "hlyford", password: "123", venmo_username: "HannahLyford")
aiden = User.create(first_name: "Aiden", last_name: "Jacobs", username: "ajacobs", password: "123", venmo_username: "Aiden-Jacobs")
molly = User.create(first_name: "Molly", last_name: "Obermeier", username: "tamolly", password: "123", venmo_username: "Tamolly")
alec = User.create(first_name: "Alec", last_name: "Stolz", username: "alecstolz", password: "123", venmo_username: "Alec-Stolz-1")
matt = User.create(first_name: "Matt", last_name: "Turco", username: "mattturco", password: "123", venmo_username: "mturco")

puts "Creating bills..."
bill1 = Bill.create(creator_id: anna.id, title: "Board & Bottle @ Postino", date: "2023-01-24", bill_note: "3 board & bottles, shared between 3 people, $25/each", total_amount: 97.93)
bill2 = Bill.create(creator_id: anna.id, title: "Pizza @ Gamenight", date: "2023-01-17", bill_note: "2 large pizzas, split between 6 people, $33/each", total_amount: 82.58)
# bill3 = Bill.create(creator_id: johnny.id, title: "Cherry Cricket", date: "2023-01-14", bill_note: "drinks", total_amount: .44)
bill4 = Bill.create(creator_id: johnny.id, title: "El Five", date: "2023-01-20", bill_note: "drinks & apps", total_amount: 137.1)
bill5 = Bill.create(creator_id: anna.id, title: "Ski Trip Coffee", date: "2022-01-18", bill_note: "skiing with the girls; Winter Park", total_amount: 42.82)
bill6 = Bill.create(creator_id: anna.id, title: "Beers & Food after Climbing", date: "2022-01-13", bill_note: "Stanley Beer Hall", total_amount: 118.82)
bill7 = Bill.create(creator_id: johnny.id, title: "Movie - Glass Onion", date: "2022-12-14", bill_note: "", total_amount: 53.86)
bill8 = Bill.create(creator_id: johnny.id, title: "Improper City", date: "2022-12-06", bill_note: "Drinks after Phase 3", total_amount: 54.18)

puts "Creating items..."
item1 = Item.create(bill_id: bill1.id, user_id: anna.id, item_note: "1 board & bottle", item_amount: 25, settled: true)
item2 = Item.create(bill_id: bill1.id, user_id: johnny.id, item_note: "1 board & bottle", item_amount: 25, settled: false)
item3 = Item.create(bill_id: bill1.id, user_id: rachel.id, item_note: "1 board & bottle", item_amount: 25, settled: false)
item4 = Item.create(bill_id: bill4.id, user_id: johnny.id, item_note: "3 whiskey sours", item_amount: 48, settled: true)
item5 = Item.create(bill_id: bill4.id, user_id: mike.id, item_note: "1 old fashioned, 1 margarita", item_amount: 37, settled: false)
item6 = Item.create(bill_id: bill4.id, user_id: anna.id, item_note: "1 moscow mule, garlic bread", item_amount: 20, settled: false)
item7 = Item.create(bill_id: bill5.id, user_id: anna.id, item_note: "large chai tea latte", item_amount: 6.55, settled: true)
item8 = Item.create(bill_id: bill5.id, user_id: aiden.id, item_note: "small mocha, breakfast sandwich", item_amount: 13.75, settled: true)
item9 = Item.create(bill_id: bill5.id, user_id: hannah.id, item_note: "large cold brew, breakfast sandwich", item_amount: 12.50, settled: false)
item10 = Item.create(bill_id: bill6.id, user_id: anna.id, item_note: "1 kombucha, 1/2 green chili tots ", item_amount: 13.50, settled: true)
item11 = Item.create(bill_id: bill6.id, user_id: alec.id, item_note: "2 beers, cheeseburger", item_amount: 32, settled: true)
item12 = Item.create(bill_id: bill6.id, user_id: molly.id, item_note: "1 beer, buffalo califlower", item_amount: 23, settled: true)
item13 = Item.create(bill_id: bill6.id, user_id: aiden.id, item_note: "2 beers, 1/2 green chili tots", item_amount: 22.5, settled: false)
item14 = Item.create(bill_id: bill7.id, user_id: johnny.id, item_note: "1 ticket, 1 popcorn", item_amount: 16.50, settled: true)
item15 = Item.create(bill_id: bill7.id, user_id: matt.id, item_note: "2 tickets, 2 popcorn", item_amount: 33.00, settled: true)
item16 = Item.create(bill_id: bill8.id, user_id: johnny.id, item_note: "1 espresso martini, 1 whiskey sour", item_amount: 21.25, settled: true)
item17 = Item.create(bill_id: bill8.id, user_id: anna.id, item_note: "1 kombucha", item_amount: 6.50, settled: false)
item18 = Item.create(bill_id: bill8.id, user_id: rachel.id, item_note: "1 kombucha, 1 beer", item_amount: 13.75, settled: false)

puts "Done seeding!"