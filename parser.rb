# gem install nokogiri
# ruby ./parser.rb

require "nokogiri"
require "net/http"

URL = "http://atlas.wolfram.com/01/01/views/173/TableView.html"

def get_page
  file_name = "table.html"
  if File.exists?(file_name)
    File.read(file_name)
  else
    response = Net::HTTP.get(URI.parse(URL))
    File.write(file_name, response)
    response
  end
end

html = Nokogiri::HTML(get_page)

def transform(operation)
  operation
    .sub(/Mod\[(.*)\, (\d)\]/, "(\\1) % 2")
    .gsub(/([\dpqr)]) ([\dpqr(])/, "\\1 * \\2")
    .gsub(/([\dpqr)]) ([\dpqr(])/, "\\1 * \\2")
end

rules = html
  .css(".TableText")
  .map { |e| e.text.strip }
  .reject(&:empty?)
  .each_slice(2)
  .map { |_, v| "(p, q, r) => #{transform(v)}," }

puts "const rules = ["
puts rules
puts "];"
