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

puts "Creating bills..."
bill1 = Bill.create(creator_id: anna.id, title: "Board & Bottle @ Postino", date: "2023-01-24", bill_note: "3 board & bottles, shared between 3 people, $25/each", total_amount: 97.93)
# bill2 = Bill.create(creator_id: anna.id, title: "Pizza @ Gamenight", date: "2023-01-17", bill_note: "2 large pizzas, split between 6 people, $33/each", total_amount: 82.58)
# bill3 = Bill.create(creator_id: johnny.id, title: "King Soopers", date: "2023-01-14", bill_note: "tomatoes & red peppers", total_amount: 6.44)
bill4 = Bill.create(creator_id: johnny.id, title: "El Five", date: "2023-01-20", bill_note: "drinks & apps", total_amount: 137.1)
# bill5 = Bill.create(creator_id: oren.id, title: "Ski Trip Gas", date: "2022-12-18", bill_note: "skiing with the boys", total_amount: 63.48)


puts "Creating items..."
item1 = Item.create(bill_id: bill1.id, user_id: anna.id, item_note: "1 board & bottle", item_amount: 25, settled: true)
item2 = Item.create(bill_id: bill1.id, user_id: johnny.id, item_note: "1 board & bottle", item_amount: 25, settled: false)
item3 = Item.create(bill_id: bill1.id, user_id: rachel.id, item_note: "1 board & bottle", item_amount: 25, settled: false)
item4 = Item.create(bill_id: bill4.id, user_id: johnny.id, item_note: "3 whiskey sours", item_amount: 48, settled: true)
item5 = Item.create(bill_id: bill4.id, user_id: mike.id, item_note: "1 old fashioned, 1 margarita", item_amount: 37, settled: false)
item6 = Item.create(bill_id: bill4.id, user_id: anna.id, item_note: "1 moscow mule, breaded cheese", item_amount: 20, settled: false)


puts "Done seeding!"