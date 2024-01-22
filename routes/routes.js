const router = require("express").Router();
const Habit = require("../models/habitModel.js");
router.get("/", (req, resp) => {
  Habit.find()
    .select("-updatedAt -createdAt -__v")
    .sort({ _id: -1 })
    .then((habits) => {
      var days = [];
      days.push(getD(0));
      days.push(getD(1));
      days.push(getD(2));
      days.push(getD(3));
      days.push(getD(4));
      days.push(getD(5));
      days.push(getD(6));
      resp.render("habit", { habit: habits, days });
    })
    .catch((err) => {});
});
function getD(n) {
  let d = new Date();
  d.setDate(d.getDate() + n);
  var newDate = d.toLocaleDateString("pt-br").split("/").reverse().join("-");
  var day;
  switch (d.getDay()) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
  }
  return { date: newDate, day };
}
router.post("/habit", async (req, resp) => {
  const { content } = req.body;
  console.log(req.body.content);

  Habit.findOne({ content: content }).then((habit) => {
    if (habit) {
      let dates = habit.dates,
        tzoffset = new Date().getTimezoneOffset() * 60000;
      var today = new Date(Date.now() - tzoffset).toISOString.slice(0, 10);
      dates.find(function (item, index) {
        if (item.date == today) {
          console.log("Habit is already inserted in database");
          resp.redirect("back");
        } else {
          dates.push({ date: today, complete: "none" });
          habit.dates = dates;
          habit
            .save()
            .then((habit) => {
              resp.redirect("back");
            })
            .catch((err) => console.log());
        }
      });
    } else {
      let dates = [],
        tzoffset = new Date().getTimezoneOffset() * 60000;
      var localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, 10);
      dates.push({ date: localISOTime, complete: "none" });
      const newHabit = new Habit({
        content,
        dates,
      });
      newHabit
        .save()
        .then((habit) => {
          resp.redirect("back");
        })
        .catch((err) => console.log());
    }
  });
});

router.get("/habitStatus", (req, resp) => {
  var d = req.query.date;
  var id = req.query.id;
  Habit.findById(id)
    .then((habit) => {
      let dates = habit.dates;
      let found = false;
      dates.find(function (item, index) {
        if (item.date === d) {
          if (item.complete === "yes") {
            item.complete = "no";
          } else if (item.complete === "no") {
            item.complete = "none";
          } else if (item.complete === "none") {
            item.complete = "yes";
          }
          found = true;
        }
      });
      if (!found) {
        dates.push({ date: d, complete: "yes" });
      }
      habit.dates = dates;
      return habit.save();
    })
    .then((updatedHabit) => {
      resp.redirect("back");
    })
    .catch((err) => {
      // console.log("Habit status not updated", err);
      resp.status(500).send("Error updating habit status");
    });
});
router.get("/:id", async (req, resp) => {
  const documentProduct = await Habit.findOneAndDelete({ _id: req.params.id });
  if (!documentProduct) {
    resp.status(500).json(err);
  }
  resp.redirect("/");
});
module.exports = router;
