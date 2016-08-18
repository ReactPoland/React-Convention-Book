import webbrowser

ghlist = open('ghlist.txt', 'r+').read()
print ghlist.split('\n')
print '------'

for url in ghlist.split('\n')[0:]:
	visitedGH = open('visitedGH.txt', 'r+').read()
	if( url+'END' in visitedGH): 
		print 'exists'
		continue
	raw_input("type smth: ")
	print 'url'
	print url
	open('visitedGH.txt', 'a').write(url+'END \n')

	# Open URL in new window, raising the window if possible.
	webbrowser.open_new(url)
