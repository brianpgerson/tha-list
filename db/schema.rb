# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160426220626) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "listings", force: :cascade do |t|
    t.string   "name",                                       null: false
    t.string   "description",                                null: false
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.float    "lat",              default: 0.0,             null: false
    t.float    "lng",              default: 0.0,             null: false
    t.integer  "list_id",          default: 1,               null: false
    t.integer  "how_bad_wanna_go", default: 0,               null: false
    t.string   "city",             default: "San Francisco", null: false
    t.float    "rating",           default: 0.0,             null: false
    t.string   "rating_img_url"
    t.integer  "num_ratings"
    t.string   "yelp_biz_id"
  end

  create_table "lists", force: :cascade do |t|
    t.string   "name",                   null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "owner_id",   default: 0, null: false
  end

  add_index "lists", ["owner_id"], name: "index_lists_on_owner_id", using: :btree

  create_table "user_lists", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "list_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "user_lists", ["list_id"], name: "index_user_lists_on_list_id", using: :btree
  add_index "user_lists", ["user_id"], name: "index_user_lists_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
