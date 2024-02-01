var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = CSTParser","category":"page"},{"location":"#CSTParser","page":"Home","title":"CSTParser","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: Dev) (Image: Project Status: Active - The project has reached a stable, usable state and is being actively developed.) (Image: ) (Image: codecov)","category":"page"},{"location":"","page":"Home","title":"Home","text":"A parser for Julia using Tokenize that aims to extend the built-in parser by providing additional meta information along with the resultant AST.","category":"page"},{"location":"#Installation-and-Usage","page":"Home","title":"Installation and Usage","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"using Pkg\nPkg.add(\"CSTParser\")","category":"page"},{"location":"","page":"Home","title":"Home","text":"using CSTParser","category":"page"},{"location":"","page":"Home","title":"Home","text":"Documentation: (Image: Dev)","category":"page"},{"location":"#Additional-Output","page":"Home","title":"Additional Output","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"EXPR's are iterable producing children in the order that they appear in the source code, including punctuation.\nExample:\nf(x) = x*2 becomes [f(x), =, x*2]\nf(x) becomes [f, (, x, )]\nThe byte span of each EXPR is stored allowing a mapping between byte position in the source code and the releveant parsed expression. The span of a single token includes any trailing whitespace, newlines or comments. This also allows for fast partial parsing of modified source code.\nFormatting hints are generated as the source code is parsed (e.g. mismatched indents for blocks, missing white space around operators).\nThe declaration of modules, functions, datatypes and variables are tracked and stored in the relevant hierarchical scopes attatched to the expressions that declare the scope. This allows for a mapping between any identifying symbol and the relevant code that it refers to.","category":"page"},{"location":"#Structure","page":"Home","title":"Structure","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Expressions are represented solely by the following types:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Parser.SyntaxNode\n  Parser.EXPR\n  Parser.INSTANCE\n    Parser.HEAD{K}\n    Parser.IDENTIFIER\n    Parser.KEYWORD{K}\n    Parser.LITERAL{K}\n    Parser.OPERATOR{P,K,dot}\n    Parser.PUNCTUATION\n  Parser.QUOTENODE","category":"page"},{"location":"","page":"Home","title":"Home","text":"The K parameterisation refers to the kind of the associated token as specified by Tokenize.Tokens.Kind. The P and dot parameters for operators refers to the precedence of the operator and whether it is dotted (e.g. .+).","category":"page"},{"location":"","page":"Home","title":"Home","text":"INSTANCEs represent singular objects that may have a concrete or implicit relation to a portion of the source text. In the the former case they have a span storing the width in bytes that they occupy in the source text, in the latter case their span is 0. Additionally, IDENTIFIERs store their value as a Symbol and LITERALs as a String.","category":"page"},{"location":"","page":"Home","title":"Home","text":"EXPR are equivalent to Base.Expr but have extra fields to store their span and any punctuation tokens.","category":"page"},{"location":"syntax/#Syntax-Reference","page":"Syntax Reference","title":"Syntax Reference","text":"","category":"section"},{"location":"syntax/","page":"Syntax Reference","title":"Syntax Reference","text":"Modules = [CSTParser]\nPages   = [\"syntax.md\"]","category":"page"},{"location":"syntax/#Main","page":"Syntax Reference","title":"Main","text":"","category":"section"},{"location":"syntax/","page":"Syntax Reference","title":"Syntax Reference","text":"Modules = [CSTParser]\nPages = readdir(\"../src\")","category":"page"},{"location":"syntax/#CSTParser.remlineinfo!-Tuple{Any}","page":"Syntax Reference","title":"CSTParser.remlineinfo!","text":"remlineinfo!(x)\n\nRemoves line info expressions. (i.e. Expr(:line, 1))\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.to_codeobject-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.to_codeobject","text":"to_codeobject(x::EXPR)\n\nConvert an EXPR into the object that Meta.parse would have produced from the original string, which could e.g. be an Expr, Symbol, or literal.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.get_sig-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.get_sig","text":"get_sig(x)\n\nReturns the full signature of function, macro and datatype definitions. Should only be called when has_sig(x) == true.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.is_getfield-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.is_getfield","text":"is_getfield(x::EXPR)\n\nIs this an expression of the form a.b.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.is_wrapped_assignment-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.is_wrapped_assignment","text":"is_wrapped_assignment(x::EXPR)\n\nIs x an assignment expression, ignoring any surrounding parentheses.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.read_ws_comment-Tuple{Any, Char}","page":"Syntax Reference","title":"CSTParser.read_ws_comment","text":"lex_ws_comment(l::Lexer, c)\n\nHaving hit an initial whitespace/comment/semicolon continues collecting similar Chars until they end. Returns a WS token with an indication of newlines/ semicolons. Indicating a semicolons takes precedence over line breaks as the former is equivalent to the former in most cases.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse","page":"Syntax Reference","title":"CSTParser.parse","text":"parse(str, cont = false)\n\nParses the passed string. If cont is true then will continue parsing until the end of the string returning the resulting expressions in a TOPLEVEL block.\n\n\n\n\n\n","category":"function"},{"location":"syntax/#CSTParser.parse_compound-Tuple{ParseState, CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.parse_compound","text":"parse_compound(ps::ParseState, ret::EXPR)\n\nAttempts to parse a compound expression given the preceding expression ret.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_doc-Tuple{ParseState}","page":"Syntax Reference","title":"CSTParser.parse_doc","text":"parse_doc(ps::ParseState)\n\nUsed for top-level parsing - attaches documentation (such as this) to expressions.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_expression","page":"Syntax Reference","title":"CSTParser.parse_expression","text":"parse_expression(ps)\n\nParses an expression until closer(ps) == true. Expects to enter the ParseState the token before the the beginning of the expression and ends on the last token.\n\nAcceptable starting tokens are:\n\nA keyword\nAn opening parentheses or brace.\nAn operator.\nAn instance (e.g. identifier, number, etc.)\nAn @.\n\n\n\n\n\n","category":"function"},{"location":"syntax/#CSTParser.parse_paren-Tuple{ParseState}","page":"Syntax Reference","title":"CSTParser.parse_paren","text":"parse_paren(ps, ret)\n\nParses an expression starting with a (.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.EXPR","page":"Syntax Reference","title":"CSTParser.EXPR","text":"EXPR represents Julia expressions overlaying a span of bytes in the source text. The full span starts at the first syntactically significant token and includes any trailing whitespace/comments.\n\nIterating or directly indexing EXPR results in a sequence of child EXPR in source order, including most syntax trivia but not including whitespace, comments and semicolons.\n\nThe fields of EXPR are:\n\nhead represents the type of the expression\nFor internal tree nodes it usually matches the associated Expr's head field. But not always because there's some additional heads, for example :brackets for grouping parentheses, :globalrefdoc, :quotenode, etc\nFor leaf nodes (ie, individual tokens), it's capitalized. Eg, :INTEGER for integer tokens, :END for end, :LPAREN for [, etc.\nFor syntactic operators such as = and <: (which have the operator itself as the expression head in normal Expr), the head is an EXPR.\nargs are the significant subexpressions, in the order used by Base.Expr.  For leaf nodes, this is nothing.\ntrivia are any nontrivial tokens which are trivial after parsing.\nThis includes things like the parentheses in (1 + 2), and the keywords in begin x end\nWhitespace and comments are not included in trivia\nfullspan is the total number of bytes of text covered by this expression, including any trailing whitespace or comment trivia.\nspan is the number of bytes of text covered by the syntactically   relevant part of this expression (ie, not including trailing whitespace   or comment trivia).\nval is the source text covered by span\nparent is the parent node in the expression tree, or Nothing for the root.\nmeta contains metadata. This includes some ad-hoc information supplied by the parser. (But can also be used downstream in linting or static analysis.)\n\nWhitespace, comments and semicolons are not represented explicitly. Rather, they're tacked onto the end of leaf tokens in args or trivia, in the last fullspan-span bytes of the token.\n\n\n\n\n\n","category":"type"},{"location":"syntax/#CSTParser._do_kw_convert-Tuple{ParseState, CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser._do_kw_convert","text":"_do_kw_convert(ps::ParseState, a::EXPR)\n\nShould a be converted to a keyword-argument expression?\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser._kw_convert-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser._kw_convert","text":"_kw_convert(ps::ParseState, a::EXPR)\n\nConverted an assignment expression to a keyword-argument expression.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.can_become_chain-Tuple{CSTParser.EXPR, CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.can_become_chain","text":"can_become_chain(x::EXPR, op::EXPR)\n\nIs x a binary call for + or * that can be extended to include more arguments?\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.can_become_comparison-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.can_become_comparison","text":"can_become_comparison(x::EXPR)\n\nIs x a binary comparison call (e.g. a < b) that can be extended to include more arguments?\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.check_span","page":"Syntax Reference","title":"CSTParser.check_span","text":"check_span(x, neq = [])\n\nRecursively checks whether the span of an expression equals the sum of the span of its components. Returns a vector of failing expressions.\n\n\n\n\n\n","category":"function"},{"location":"syntax/#CSTParser.closer-Tuple{ParseState}","page":"Syntax Reference","title":"CSTParser.closer","text":"closer(ps::ParseState)\n\nA magical function determining whether the parsing of an expression should continue or stop.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.compare-Tuple{Any, Any}","page":"Syntax Reference","title":"CSTParser.compare","text":"compare(x,y)\n\nRecursively checks whether two Base.Expr are the same. Returns unequal sub- expressions.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.convertsigtotuple-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.convertsigtotuple","text":"convertsigtotuple(sig::EXPR)\n\nWhen parsing a function or macro signature, should it be converted to a tuple?\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.disallowednumberjuxt-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.disallowednumberjuxt","text":"disallowednumberjuxt(ret::EXPR)\n\nDoes this number literal end in a decimal and so cannot precede a paren for implicit multiplication?\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.docable-Tuple{Any}","page":"Syntax Reference","title":"CSTParser.docable","text":"docable(head)\n\nWhen parsing a block of expressions, can documentation be attached? Prefixed docs at the top-level are handled within parse(ps::ParseState, cont = false).\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.find_arg_at-Tuple{CSTParser.EXPR, Any}","page":"Syntax Reference","title":"CSTParser.find_arg_at","text":"find_arg_at(x, i)\n\nReturns the index of the node of x within which the byte offset i falls.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.firstdiff-Tuple{AbstractString, AbstractString}","page":"Syntax Reference","title":"CSTParser.firstdiff","text":"firstdiff(s0::AbstractString, s1::AbstractString)\n\nReturns the last byte index, i, for which s0 and s1 are the same such that:     s0[1:i] == s1[1:i]\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.has_error-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.has_error","text":"has_error(ps::ParseState)\nhas_error(x::EXPR)\n\nDetermine whether a parsing error occured while processing text with the given ParseState, or exists as a (sub) expression of x.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.revfirstdiff-Tuple{AbstractString, AbstractString}","page":"Syntax Reference","title":"CSTParser.revfirstdiff","text":"revfirstdiff(s0::AbstractString, s1::AbstractString)\n\nReversed version of firstdiff but returns two indices, one for each string.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.str_value-Tuple{Any}","page":"Syntax Reference","title":"CSTParser.str_value","text":"str_value(x)\n\nAttempt to get a string representation of a nodeless expression.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.@closer-Tuple{Any, Any, Any}","page":"Syntax Reference","title":"CSTParser.@closer","text":"@closer ps rule body\n\nContinues parsing closing on rule.\n\n\n\n\n\n","category":"macro"},{"location":"syntax/#CSTParser.@default-Tuple{Any, Any}","page":"Syntax Reference","title":"CSTParser.@default","text":"@default ps body\n\nParses the next expression using default closure rules.\n\n\n\n\n\n","category":"macro"},{"location":"syntax/#CSTParser.@nocloser-Tuple{Any, Any, Any}","page":"Syntax Reference","title":"CSTParser.@nocloser","text":"@nocloser ps rule body\n\nContinues parsing not closing on rule.\n\n\n\n\n\n","category":"macro"},{"location":"syntax/#CSTParser.@precedence-Tuple{Any, Any, Any}","page":"Syntax Reference","title":"CSTParser.@precedence","text":"@precedence ps prec body\n\nContinues parsing binary operators until it hits a more loosely binding operator (with precdence lower than prec).\n\n\n\n\n\n","category":"macro"},{"location":"syntax/#Components","page":"Syntax Reference","title":"Components","text":"","category":"section"},{"location":"syntax/","page":"Syntax Reference","title":"Syntax Reference","text":"Modules = [CSTParser]\nPages = readdir(\"../src/components\")","category":"page"},{"location":"syntax/#CSTParser.is_range-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.is_range","text":"is_range(x::EXPR)\n\nIs x a valid iterator for use in for loops or generators?\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_block","page":"Syntax Reference","title":"CSTParser.parse_block","text":"Continue parsing statements until an element of closers is hit (usually end). Statements are grouped in a Block EXPR.\n\n\n\n\n\n","category":"function"},{"location":"syntax/#CSTParser.parse_call","page":"Syntax Reference","title":"CSTParser.parse_call","text":"parse_call(ps, ret)\n\nParses a function call. Expects to start before the opening parentheses and is passed the expression declaring the function name, ret.\n\n\n\n\n\n","category":"function"},{"location":"syntax/#CSTParser.parse_comma_sep","page":"Syntax Reference","title":"CSTParser.parse_comma_sep","text":"Parses a comma separated list, optionally allowing for conversion of assignment (=) expressions to Kw.\n\n\n\n\n\n","category":"function"},{"location":"syntax/#CSTParser.parse_dot_mod","page":"Syntax Reference","title":"CSTParser.parse_dot_mod","text":"Helper function for parsing import/using statements.\n\n\n\n\n\n","category":"function"},{"location":"syntax/#CSTParser.parse_filter-Tuple{ParseState, Any}","page":"Syntax Reference","title":"CSTParser.parse_filter","text":"parse_filter(ps::ParseState, arg)\n\nParse a conditional filter following a generator.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_generator-Tuple{ParseState, CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.parse_generator","text":"parse_generator(ps)\n\nHaving hit for not at the beginning of an expression return a generator. Comprehensions are parsed as SQUAREs containing a generator.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_iterator","page":"Syntax Reference","title":"CSTParser.parse_iterator","text":"Parses an iterator, allowing for the preceding keyword outer. Returns an error expression if an invalid expression is parsed (anything other than =, in, ∈).\n\n\n\n\n\n","category":"function"},{"location":"syntax/#CSTParser.parse_iterators-Tuple{ParseState, Any, Any}","page":"Syntax Reference","title":"CSTParser.parse_iterators","text":"parse_iterators(ps::ParseState, allowfilter = false)\n\nParses a group of iterators e.g. used in a for loop or generator. Can allow for a succeeding Filter expression.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_macrocall-Tuple{ParseState}","page":"Syntax Reference","title":"CSTParser.parse_macrocall","text":"parse_macrocall(ps)\n\nParses a macro call. Expects to start on the @.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_parameters","page":"Syntax Reference","title":"CSTParser.parse_parameters","text":"parse_parameters(ps::ParseState, args::Vector{EXPR}, args1::Vector{EXPR} = EXPR[]; usekw = true)\n\nParses parameter arguments for a function call (e.g. following a semicolon).\n\n\n\n\n\n","category":"function"},{"location":"syntax/#CSTParser.parse_blockexpr-Tuple{ParseState, Any}","page":"Syntax Reference","title":"CSTParser.parse_blockexpr","text":"parse_blockexpr(ps::ParseState, head)\n\nGeneral function for parsing block expressions comprised of a series of statements terminated by an end.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_blockexpr_sig-Tuple{ParseState, Any}","page":"Syntax Reference","title":"CSTParser.parse_blockexpr_sig","text":"parse_blockexpr_sig(ps::ParseState, head)\n\nUtility function to parse the signature of a block statement (i.e. any statement preceding the main body of the block). Returns nothing in some cases (e.g. begin end)\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_if","page":"Syntax Reference","title":"CSTParser.parse_if","text":"parse_if(ps, nested=false)\n\nParse an if block.\n\n\n\n\n\n","category":"function"},{"location":"syntax/#CSTParser.parse_kw-Tuple{ParseState}","page":"Syntax Reference","title":"CSTParser.parse_kw","text":"parse_kw(ps::ParseState)\n\nDispatch function for when the parser has reached a keyword.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_array","page":"Syntax Reference","title":"CSTParser.parse_array","text":"parse_array(ps)\n\nHaving hit '[' return either:\n\nA vect\nA vcat\nA ncat\nA comprehension\nAn array (vcat of hcats)\n\n\n\n\n\n","category":"function"},{"location":"syntax/#CSTParser.parse_curly-Tuple{ParseState, CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.parse_curly","text":"parse_curly(ps, ret)\n\nParses the juxtaposition of ret with an opening brace. Parses a comma seperated list.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_ref-Tuple{ParseState, CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.parse_ref","text":"parse_ref(ps, ret)\n\nHandles cases where an expression - ret - is followed by [. Parses the following bracketed expression and modifies it's .head appropriately.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_tuple","page":"Syntax Reference","title":"CSTParser.parse_tuple","text":"parse_tuple(ps, ret)\n\nret is followed by a comma so tries to parse the rest of the tuple.\n\n\n\n\n\n","category":"function"},{"location":"syntax/#CSTParser.parse_unary-Tuple{ParseState, CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.parse_unary","text":"parse_unary(ps)\n\nHaving hit a unary operator at the start of an expression return a call.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_prefixed_string_cmd-Tuple{ParseState, CSTParser.EXPR}","page":"Syntax Reference","title":"CSTParser.parse_prefixed_string_cmd","text":"parse_prefixed_string_cmd(ps::ParseState, ret::EXPR)\n\nParse prefixed strings and commands such as pre\"text\".\n\n\n\n\n\n","category":"method"},{"location":"syntax/#CSTParser.parse_string_or_cmd","page":"Syntax Reference","title":"CSTParser.parse_string_or_cmd","text":"parsestringor_cmd(ps)\n\nWhen trying to make an INSTANCE from a string token we must check for interpolating operators.\n\n\n\n\n\n","category":"function"}]
}
