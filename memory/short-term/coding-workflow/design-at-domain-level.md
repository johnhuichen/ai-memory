> Memory: When proposing a design or code change, stay at the level of the domain model.

When proposing a design or code change, stay at the level of the domain model: show the definitions of new or changed types with their methods, and how they work with the existing types. Leave out call-site changes, line numbers and file-by-file consequences, because they follow from the model and crowd the reader's context. Say what a method does only where its behavior is a decision the user could disagree with.
