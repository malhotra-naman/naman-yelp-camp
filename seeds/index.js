const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis convallis urna sed fringilla. Aenean facilisis ante eget eros aliquet, eu hendrerit arcu dapibus. Suspendisse accumsan hendrerit dui. Praesent cursus elit orci, ut lobortis erat efficitur ac. Nulla pellentesque ac eros ac vulputate. Fusce lobortis urna sit amet velit convallis imperdiet. Phasellus at iaculis dui, ut aliquet lorem. Quisque sed bibendum elit, vel aliquet ipsum. Duis laoreet odio ac tincidunt aliquet. Proin ullamcorper nisi vel dui semper convallis ac sit amet risus.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
